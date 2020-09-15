import React, {FC} from "react";
import {Dimensions, Image, ScrollView, Slider, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from '@expo/vector-icons';

import Text from "../../components/Text";
import styles from "../../styles";
import {RootState} from "../../store";
import {thunkNextTrack, thunkPlayPause, thunkPrevTrack, thunkUpdateSong} from "../../thunk";
import PlayMode from "../../models/PlayMode";
import {setPlayMode} from "../../store/audio/actions";

type Props = {
    route: any;
    navigation: any;
}

const SongScreen: FC<Props> = ({route, navigation}) => {
    const dispatch = useDispatch();

    const {currentId: id, isPlaying, playbackInstance, playMode} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === id)!;
    const position = Math.round(useSelector(({audio: {currentPosition}}: RootState) => currentPosition) / 1000);

    navigation.setOptions({
        title: song.title
    });

    return (
        <ScrollView>
            <View style={[styles.screen, {
                padding: 30,
                alignItems: 'center',
                minHeight: Dimensions.get('window').height
            }]}>
                <View style={{alignItems: 'center', marginBottom: 50}}>
                    <Text size={4} numberOfLines={1}>Album: {song.album || 'unknown'}</Text>
                    <Text size={4} numberOfLines={1}>Artist: {song.artist || 'unknown'}</Text>
                    <Text size={4} numberOfLines={1}>Genre: {song.genre || 'unknown'}</Text>
                </View>
                <View style={{backgroundColor: '#D3D4D6', borderRadius: 10, borderWidth: 2, borderColor: '#D3D4D6'}}>
                    <Image source={{
                        uri: song.coverUri
                    }} style={{
                        width: Dimensions.get('window').width - 60,
                        height: Dimensions.get('window').width - 60,
                        borderRadius: 10
                    }}/>
                </View>
                <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 60, marginTop: 50}}>
                    <View style={styles.songAction}>
                        <MaterialIcons name="delete" size={24} color="#D3D4D6"/>
                        <Text size={6} numberOfLines={1}>Exclude</Text>
                    </View>
                    <View style={styles.songAction}>
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
                    <View style={styles.songAction}>
                        <MaterialIcons name="short-text" size={24} color="#D3D4D6"/>
                        <Text size={6} numberOfLines={1}>Load Lyrics</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 60, marginTop: 20}}>
                    <View style={styles.songAction}>
                        <MaterialIcons name="image" size={24} color="#D3D4D6"/>
                        <Text size={6} numberOfLines={1}>Set Cover</Text>
                    </View>
                    <View style={styles.songAction}>
                        <MaterialIcons name="music-video" size={24} color="#D3D4D6"/>
                        <Text size={6} numberOfLines={1}>Set Video</Text>
                    </View>
                    <View style={styles.songAction}>
                        <MaterialIcons name="edit" size={24} color="#D3D4D6"/>
                        <Text size={6} numberOfLines={1}>Edit</Text>
                    </View>
                </View>
                <View style={{
                    width: Dimensions.get('window').width - 60,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginVertical: 50
                }}>
                    <Text>
                        {Math.floor(position / 60) < 10 ? '0' + Math.floor(position / 60) : Math.floor(position / 60)}
                        :
                        {Math.floor(position % 60) < 10 ? '0' + Math.floor(position % 60) : Math.floor(position % 60)}
                    </Text>
                    <Slider style={{width: Dimensions.get('window').width - 160}} minimumValue={0}
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
                    <MaterialIcons name="skip-next" size={30} color="#D3D4D6" onPress={() => {
                        dispatch(thunkNextTrack());
                    }}/>
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
                </View>
            </View>
        </ScrollView>
    );
};

export default SongScreen;
