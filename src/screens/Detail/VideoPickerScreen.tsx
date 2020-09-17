import React, {FC, useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import SongSlider from "../../components/helpers/detail/SongSlider";
import SongController from "../../components/helpers/detail/SongController";
import Text from "../../components/Text";
import {RootState} from "../../store";
import styles from "../../styles";
import {MaterialIcons} from "@expo/vector-icons";
import {setLoadingState} from "../../store/isLoading/actions";
import * as DocumentPicker from "expo-document-picker";
import FastVideo from "../../components/helpers/detail/FastVideo";
import {thunkSaveVideo} from "../../thunk";

type Props = {
    navigation: any;
};

const VideoPickerScreen: FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();

    const {currentId, playbackInstance, isPlaying, playMode} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === currentId)!;
    const position = Math.round(useSelector(({audio: {currentPosition}}: RootState) => currentPosition) / 1000);

    useEffect(() => {
        navigation.setOptions({
            title: song.title
        });
    }, [song]);

    const [video, setVideo] = useState(song.videoUri || '');

    const onVideo = async () => {
        dispatch(setLoadingState(true));

        const result = await DocumentPicker.getDocumentAsync({
            type: 'video/*'
        });

        if (result.type !== "cancel")
            setVideo(result.uri);

        dispatch(setLoadingState(false));
    };

    const onSave = () => {
        if (video)
            dispatch(thunkSaveVideo(video, song));
        navigation.goBack();
    };

    return (
        <View style={[styles.screen, {padding: 30, width: '100%'}]}>
            <SongSlider position={position} song={song} playbackInstance={playbackInstance}/>
            <SongController isPlaying={isPlaying} playMode={playMode}/>
            <TouchableOpacity style={styles.button} onPress={onVideo}>
                <Text>Select Video</Text>
                <MaterialIcons name="camera-alt" size={16} color="#D3D4D6" style={{marginHorizontal: 5}}/>
            </TouchableOpacity>
            <FastVideo uri={video}/>
            <TouchableOpacity onPress={onSave} style={styles.button}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VideoPickerScreen;
