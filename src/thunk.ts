import * as MediaLibrary from 'expo-media-library';
import {Alert} from 'react-native';
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";

import {setSongs, updateSong as updateLocalSong} from "./store/songs/actions";
import {setLoadingState} from './store/isLoading/actions';
import {RootState} from "./store";
import MusicInfo from "./utils/MusicInfo";
import {getSongs, insertSong, updateSong} from './db';
import {SQLResultSet} from "expo-sqlite";
import {Song} from "./store/songs/types";
import {Audio, AVPlaybackStatus} from "expo-av";
import {setBuffering, setCurrentId, setPlaybackInstance, setPlaying} from "./store/audio/actions";
import SettingsST from "./models/SettingsST";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>

export const thunkInitializeApp = (): AppThunk<void> => async (dispatch, getState) => {
    dispatch(setLoadingState(true));

    const grantPermissionResult = await MediaLibrary.requestPermissionsAsync();
    if (grantPermissionResult.status !== "granted") {
        Alert.alert('Insufficient Permissions!', 'You need to grant camera roll permissions to use this app.',
            [{text: 'Okay!'}, {
                text: 'Try again!', onPress: () => {
                    dispatch(thunkInitializeApp());
                }
            }]);
        return;
    }

    await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false
    });

    const audios = (await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 10000
    })).assets;

    const dbSongs = (await getSongs()).rows._array;

    const songs: Song[] = [];

    for (const audio of audios) {
        if (dbSongs.map(({clientId}: any) => clientId.toString()).includes(audio.id)) {
            const dbSong = dbSongs.find(({clientId}: any) => clientId.toString() === audio.id);
            songs.push({
                ...dbSong,
                isExcluded: dbSong.isExcluded === 'yes',
                isFav: dbSong.isFav === 'yes',
                id: audio.id,
                dbId: dbSong.id.toString()
            });
        } else {
            const musicInfo = await MusicInfo.getMusicInfoAsync(audio.uri);
            const song = {
                id: audio.id,
                clientId: audio.id,
                title: musicInfo?.title || audio.filename.replace(/\..+$/, ''),
                album: musicInfo?.album,
                artist: musicInfo?.artist,
                genre: musicInfo?.genre,
                isExcluded: false,
                isFav: false,
                coverUri: musicInfo?.picture?.pictureData,
                uri: audio.uri,
                duration: audio.duration,
                dbId: ''
            };
            const dbResult: SQLResultSet = await insertSong(song);

            song.dbId = dbResult.insertId.toString();

            songs.push(song);
        }
    }

    songs.sort((s1, s2) => {
        return s1.title.toLowerCase().localeCompare(s2.title.toLowerCase());
    });

    dispatch(setSongs(songs));

    dispatch(thunkLoadSong(songs[0].id));

    dispatch(setLoadingState(false));
};

export const thunkLoadSong = (id: string, shouldPlay: boolean = false): AppThunk<void> => async (dispatch, getState) => {

    dispatch(setCurrentId(id));

    const {audio: {isPlaying, volume, playbackInstance: prevPlaybackInstance}, songs: {songs}}: RootState = getState();

    await prevPlaybackInstance?.unloadAsync();

    const playbackInstance = new Audio.Sound();

    playbackInstance.setOnPlaybackStatusUpdate((playbackStatus: AVPlaybackStatus) => {
        if (!playbackStatus.isLoaded) {
            if (playbackStatus.error) {
                console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        } else {
            dispatch(setBuffering(playbackStatus.isBuffering));

            if (playbackStatus.didJustFinish && !playbackStatus.isLooping)
                dispatch(thunkNextTrack());
            if (playbackStatus.shouldPlay && !playbackStatus.isPlaying && playbackStatus.isLoaded)
                playbackInstance.playAsync();
        }
    });
    await playbackInstance.loadAsync({
        uri: songs.find(song => song.id === id)!.uri
    }, {
        shouldPlay: isPlaying || shouldPlay,
        volume
    });

    dispatch(setPlaying(isPlaying || shouldPlay));

    dispatch(setPlaybackInstance(playbackInstance));
};

export const thunkPlayPause = ():AppThunk<void> => async (dispatch, getState) => {
    const {audio: {isPlaying, playbackInstance}}: RootState = getState();
    isPlaying ? await playbackInstance?.pauseAsync() : await playbackInstance?.playAsync();

    dispatch(setPlaying(!isPlaying));
};

export const thunkPrevTrack = ():AppThunk<void> => async (dispatch, getState) => {
    const {audio: {currentId}} = getState();
    const prevSong = SettingsST.getInstance().getPrev(currentId);

    dispatch(thunkLoadSong(prevSong.id, true));
};

export const thunkNextTrack = ():AppThunk<void> => async (dispatch, getState) => {
    const {audio: {currentId}} = getState();
    const nextSong = SettingsST.getInstance().getNext(currentId);

    dispatch(thunkLoadSong(nextSong.id, true));
};

export const thunkUpdateSong = (song: Song):AppThunk<void> => async (dispatch) => {
    await updateSong(song.dbId, {
        clientId: song.id,
        title: song.title,
        album: song.album,
        artist: song.artist,
        genre: song.genre,
        isExcluded: song.isExcluded,
        isFav: song.isFav,
        lrcUri: song.lrcUri,
        coverUri: song.coverUri,
        videoUri: song.videoUri,
        uri: song.uri,
        duration: song.duration
    });

    dispatch(updateLocalSong(song));
};
