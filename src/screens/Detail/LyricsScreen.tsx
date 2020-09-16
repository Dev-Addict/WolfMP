import React, {useState, FC} from "react";
import {FlatList, KeyboardAvoidingView, View} from 'react-native';
import Lyrics from "../../models/Lyrics";
import SongSlider from "../../components/helpers/detail/SongSlider";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import LyricsActions from "../../components/helpers/detail/LyricsActions";
import LyricsLineItem from "../../components/helpers/detail/LyricLineItem";
import styles from "../../styles";
import SongController from "../../components/helpers/detail/SongController";
import {thunkSaveLyrics} from "../../thunk";

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

    const onLrc = () => {
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
                <LyricsActions onLrc={onLrc} onAddLine={onAddLine} onCancel={onCancel} onSave={onSave}/>
                <FlatList data={lyrics} style={{marginTop: 50}}
                          renderItem={(props) => <LyricsLineItem setLyrics={setLyrics} lyrics={lyrics} {...props}/>}/>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LyricsScreen;
