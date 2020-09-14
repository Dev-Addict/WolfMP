import * as MediaLibrary from 'expo-media-library';
import {Alert} from 'react-native';
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";

import {setSongs} from "./store/songs/actions";
import {setLoadingState} from './store/isLoading/actions';
import {RootState} from "./store";
import MusicInfo from "./utils/MusicInfo";
import {getSongs, insertSong} from './db';
import {SQLResultSet} from "expo-sqlite";
import {Song} from "./store/songs/types";

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >

export const thunkInitializeApp = (): AppThunk<void> => async dispatch => {
    dispatch(setLoadingState(true));

    const grantPermissionResult = await MediaLibrary.requestPermissionsAsync();
    if (grantPermissionResult.status !== "granted") {
        Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.',
            [{text: 'Okay!'}, {
                text: 'Try again!', onPress: () => {
                    dispatch(thunkInitializeApp());
                }
            }]);
        return;
    }

    const audios = (await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 10000
    })).assets;

    const dbSongs = (await getSongs()).rows._array;

    const songs: Song[] = [];

    for (const audio of audios) {
        if (dbSongs.map(({clientId}: any) => clientId.toString()).includes(audio.id)) {
            const dbSong = dbSongs.find(({clientId}: any) => clientId.toString() === audio.id);
            songs.push({...dbSong, isExcluded: dbSong.isExcluded === 'yes', isFav: dbSong.isFav === 'yes', id: audio.id});
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

    dispatch(setLoadingState(false));
};
