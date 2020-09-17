import React, {FC} from "react";
import {Audio} from 'expo-av';
import {Dimensions, Slider, View} from "react-native";

import Text from "../../Text";
import {Song} from "../../../store/songs/types";

type Props = {
    position: number;
    song: Song;
    playbackInstance: Audio.Sound | null;
    isInVideoPlayer?: boolean;
};

const SongSlider: FC<Props> = ({song, position, playbackInstance, isInVideoPlayer = false}) => {
    return (
        <View style={{
            width: Dimensions.get('window').width - 60,
            justifyContent: isInVideoPlayer ? 'space-around' : 'space-between',
            flexDirection: 'row',
            marginVertical: isInVideoPlayer ? 0 : 50
        }}>
            <Text>
                {Math.floor(position / 60) < 10 ? '0' + Math.floor(position / 60) : Math.floor(position / 60)}
                :
                {Math.floor(position % 60) < 10 ? '0' + Math.floor(position % 60) : Math.floor(position % 60)}
            </Text>
            <Slider style={{width: Dimensions.get('window').width - (isInVideoPlayer ? 200 : 160)}} minimumValue={0}
                    maximumValue={Math.floor(song.duration)} maximumTrackTintColor="#D3D4D6"
                    minimumTrackTintColor="#D3D4D6" thumbTintColor="#D3D4D6" value={position}
                    onValueChange={value => {
                        playbackInstance?.setPositionAsync(value * 1000);
                    }}/>
            <Text>
                {Math.floor(song.duration / 60) < 10 ? '0' + Math.floor(song.duration / 60) : Math.floor(song.duration / 60)}
                :
                {Math.floor(song.duration % 60) < 10 ? '0' + Math.floor(song.duration % 60) : Math.floor(song.duration % 60)}
            </Text>
        </View>
    );
};

export default SongSlider;
