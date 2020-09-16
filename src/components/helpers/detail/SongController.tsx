import React, {FC} from "react";
import {Dimensions, View} from "react-native";
import {useDispatch} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";

import {thunkNextTrack, thunkPlayPause, thunkPrevTrack} from "../../../thunk";
import PlayMode from "../../../models/PlayMode";
import {setPlayMode} from "../../../store/audio/actions";

type Props = {
    isPlaying: boolean;
    playMode: PlayMode;
};

const SongController: FC<Props> = ({isPlaying, playMode}) => {
    const dispatch = useDispatch();

    return (
        <View style={[{flexDirection: 'row', width: Dimensions.get('window').width - 60, justifyContent: 'space-around'}]}>
            <MaterialIcons name="skip-previous" size={30} color="#D3D4D6" onPress={() => {
                dispatch(thunkPrevTrack());
            }}/>
            {
                isPlaying ?
                    <MaterialIcons name="pause" size={30} color="#D3D4D6" onPress={() => {
                        dispatch(thunkPlayPause());
                    }}/> :
                    < MaterialIcons name="play-arrow" size={30} color="#D3D4D6" onPress={() => {
                        dispatch(thunkPlayPause());
                    }}/>
            }
            {
                playMode === PlayMode.REPEAT ?
                    <MaterialIcons name="repeat" size={30} color="#D3D4D6" onPress={() => {
                        dispatch(setPlayMode(PlayMode.REPEAT_SONG));
                    }}/> :
                    playMode === PlayMode.REPEAT_SONG ?
                        <MaterialIcons name="repeat-one" size={30} color="#D3D4D6" onPress={() => {
                            dispatch(setPlayMode(PlayMode.SHUFFLE));
                        }}/> :
                        <MaterialIcons name="shuffle" size={30} color="#D3D4D6" onPress={() => {
                            dispatch(setPlayMode(PlayMode.REPEAT));
                        }}/>
            }
            <MaterialIcons name="skip-next" size={30} color="#D3D4D6" onPress={() => {
                dispatch(thunkNextTrack());
            }}/>
        </View>
    )
};

export default SongController;
