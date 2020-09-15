import React, {FC} from "react";
import {Image, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from '@expo/vector-icons';

import Text from "../../Text";
import {RootState} from "../../../store";
import styles from "../../../styles";
import {thunkNextTrack, thunkPlayPause, thunkPrevTrack} from "../../../thunk";

const SongController: FC = () => {
    const dispatch = useDispatch();

    const {currentId, isPlaying} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(({id}) => id === currentId)!;

    return (
        <View style={[styles.playControl, {height: 60}]}>
            {song &&
            <>
                <View style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: '#D3D4D6',
                    borderWidth: 2,
                    borderColor: '#D3D4D6'
                }}>
                    <Image source={{
                        uri: song.coverUri
                    }} style={{height: '100%', width: '100%', borderRadius: 20}}/>
                </View>
                <View style={[styles.card, {flexDirection: 'row'}]}>
                    <MaterialIcons name="skip-previous" size={24} color="#D3D4D6" onPress={() => {
                        dispatch(thunkPrevTrack());
                    }}/>
                    {isPlaying ?
                        <MaterialIcons name="pause" size={24} color="#D3D4D6" onPress={() => {
                            dispatch(thunkPlayPause());
                        }}/> :
                        < MaterialIcons name="play-arrow" size={24} color="#D3D4D6" onPress={() => {
                            dispatch(thunkPlayPause());
                        }}/>
                    }
                    <MaterialIcons name="skip-next" size={24} color="#D3D4D6" onPress={() => {
                        dispatch(thunkNextTrack());
                    }}/>
                </View>
                <View style={{flex: 1}}>
                    <Text numberOfLines={1}>{song.title}</Text>
                </View>
            </>
            }
        </View>
    );
};

export default SongController;
