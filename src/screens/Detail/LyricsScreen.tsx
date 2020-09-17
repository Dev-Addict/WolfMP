import React, {useState, FC, useEffect} from "react";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import {Alert, FlatList, KeyboardAvoidingView, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";

import LyricsActions from "../../components/helpers/detail/LyricsActions";
import LyricsLineItem from "../../components/helpers/detail/LyricLineItem";
import SongController from "../../components/helpers/detail/SongController";
import {thunkSaveLyrics} from "../../thunk";
import SongSlider from "../../components/helpers/detail/SongSlider";
import lrcParser from "../../utils/lrcParser";
import {setLoadingState} from "../../store/isLoading/actions";
import {RootState} from "../../store";
import Lyrics from "../../models/Lyrics";
import styles from "../../styles";

type Props = {
    navigation: any;
};

const initialState: Lyrics = [];
const LyricsScreen: FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();

    const {currentId, playbackInstance, isPlaying, playMode} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === currentId)!;
    const position = Math.round(useSelector(({audio: {currentPosition}}: RootState) => currentPosition) / 1000);

    const [lyrics, setLyrics] = useState(song.lyrics || initialState);

    useEffect(() => {
        navigation.setOptions({
            title: song.title
        });
    }, [song]);

    const onLrc = async () => {
        dispatch(setLoadingState(true));

        const result = await DocumentPicker.getDocumentAsync();

        if (result.type !== "cancel" && /.*\.lrc/.test(result.name))
            setLyrics(lrcParser(await FileSystem.readAsStringAsync(result.uri)) || lyrics);
        else if (result.type === "success")
            Alert.alert('Wrong Format.', 'Only lrc files are allowed to choose to fill the lyrics', [{text: 'OK!'}]);

        dispatch(setLoadingState(false));
    };

    const onAddLine = () => {
        setLyrics(lyrics => [...lyrics, {
            time: position,
            text: '',
            key: Date.now().toString(16)
        }])
    };

    const onCancel = () => {
        navigation.goBack();
    };

    const onSave = () => {
        dispatch(thunkSaveLyrics(song, lyrics));
        onCancel();
    };

    return (
        <View style={[styles.screen, {padding: 30}]}>
            <KeyboardAvoidingView>
                <SongSlider position={position} song={song} playbackInstance={playbackInstance}/>
                <SongController isPlaying={isPlaying} playMode={playMode}/>
                <LyricsActions onLrc={onLrc} onAddLine={onAddLine} onCancel={onCancel}
                               onSave={onSave}/>
                <FlatList data={lyrics} style={{marginTop: 50}}
                          renderItem={(props) => <LyricsLineItem setLyrics={setLyrics} lyrics={lyrics} {...props}/>}/>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LyricsScreen;
