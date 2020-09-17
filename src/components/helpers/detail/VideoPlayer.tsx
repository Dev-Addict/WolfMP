import React, {FC, useEffect, useRef} from "react";
import {Dimensions, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Video} from "expo-av";

import SongController from "./SongController";
import SongSlider from "./SongSlider";
import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import {setBuffering, setCurrentPosition} from "../../../store/audio/actions";
import {thunkNextTrack} from "../../../thunk";

type Props = {
    song: Song;
    position: number;
};

const VideoPlayer: FC<Props> = ({song, position}) => {
    const {isPlaying, playMode, playbackInstance} = useSelector(({audio}: RootState) => audio);

    return (
        <View style={{
            backgroundColor: '#D3D4D622', borderRadius: 10, borderWidth: 2, borderColor: '#D3D4D6',
            width: Dimensions.get('window').width - 60
        }}>
            <Video source={{
                uri: song.videoUri!
            }} shouldPlay={isPlaying} isMuted={true} resizeMode="cover" focusable={false} isLooping={true}
                   positionMillis={position * 1000} style={{
                width: '100%',
                height: (Dimensions.get('window').width - 60) * 9 / 16,
                borderRadius: 10
            }}/>
            <SongSlider position={position} song={song} playbackInstance={playbackInstance} isInVideoPlayer={true}/>
            <SongController isPlaying={isPlaying} playMode={playMode}/>
        </View>
    );
};

export default VideoPlayer;
