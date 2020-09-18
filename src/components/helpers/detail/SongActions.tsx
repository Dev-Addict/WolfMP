import React, {FC} from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {MaterialIcons} from "@expo/vector-icons";

import Text from "../../Text";
import {thunkUpdateSong} from "../../../thunk";
import {Song} from "../../../store/songs/types";
import styles from "../../../styles";

type Props = {
    song: Song;
    navigation: any;
};

const SongActions: FC<Props> = ({song, navigation}) => {
    const dispatch = useDispatch();

    return (
        <>
            <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 60, marginTop: 50}}>
                <TouchableOpacity style={styles.action} onPress={() => {
                    dispatch(thunkUpdateSong({...song, isExcluded: true}));
                }}>
                    <MaterialIcons name="delete" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Exclude</Text>
                </TouchableOpacity>
                <View style={styles.action}>
                    {
                        song.isFav ?
                            <TouchableOpacity onPress={() => {
                                dispatch(thunkUpdateSong({...song, isFav: false}));
                            }} style={styles.songActionTouchable}>
                                <MaterialIcons name="favorite" size={24} color="#D3D4D6"/>
                                <Text size={6} numberOfLines={1}>Remove from Favorite</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => {
                                dispatch(thunkUpdateSong({...song, isFav: true}));
                            }} style={styles.songActionTouchable}>
                                <MaterialIcons name="favorite-border" size={24} color="#D3D4D6"/>
                                <Text size={6} numberOfLines={1}>Add to Favorite</Text>
                            </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity style={styles.action} onPress={() => {
                    navigation.navigate('Lyrics')
                }}>
                    <MaterialIcons name="short-text" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Load Lyrics</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 60, marginTop: 20}}>
                <TouchableOpacity style={styles.action} onPress={() => {
                    navigation.navigate('ImagePicker');
                }}>
                    <MaterialIcons name="image" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Set Cover</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {
                    navigation.navigate('VideoPicker');
                }}>
                    <MaterialIcons name="music-video" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Set Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {
                    navigation.navigate('Edit')
                }}>
                    <MaterialIcons name="edit" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Edit</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default SongActions;
