import React, {FC, useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {PermissionStatus} from 'expo-image-picker';
import {Alert, Dimensions, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from '@expo/vector-icons';

import SongSlider from "../../components/helpers/detail/SongSlider";
import SongController from "../../components/helpers/detail/SongController";
import {RootState} from "../../store";
import styles from "../../styles";
import Text from "../../components/Text";
import {thunkSaveCover} from "../../thunk";

type Props = {
    navigation: any;
};

const ImagePickerScreen: FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();

    const {currentId, playbackInstance, isPlaying, playMode} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === currentId)!;
    const position = Math.round(useSelector(({audio: {currentPosition}}: RootState) => currentPosition) / 1000);

    useEffect(() => {
        navigation.setOptions({
            title: song.title
        });
    }, [song]);

    const [image, setImage] = useState(song.coverUri || '');

    const onCamera = async () => {
        const grantCameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
        const grantCameraRollPermissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (grantCameraPermissionResult.status !== PermissionStatus.GRANTED &&
            grantCameraRollPermissionResult.status !== PermissionStatus.GRANTED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera and camera roll permissions to use this app', [{text: 'Okay!'}]);
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (result.cancelled) {
            Alert.alert('Cancelled Picking Image!', 'you have cancelled image picking process if you think this is wrong try again', [{text: 'Okay!'}]);
            return;
        }

        setImage(result.uri);
    };

    const onGallery = async () => {
        const grantCameraRollPermissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (grantCameraRollPermissionResult.status !== PermissionStatus.GRANTED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera roll permissions to use this app', [{text: 'Okay!'}]);
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (result.cancelled) {
            Alert.alert('Cancelled Picking Image!', 'you have cancelled image picking process if you think this is wrong try again', [{text: 'Okay!'}]);
            return;
        }

        setImage(result.uri);
    };

    const onSave = () => {
        dispatch(thunkSaveCover(image, song));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={[styles.screen, {padding: 30, width: '100%'}]}>
                <SongSlider position={position} song={song} playbackInstance={playbackInstance}/>
                <SongController isPlaying={isPlaying} playMode={playMode}/>
                <TouchableOpacity onPress={onCamera} style={styles.button}>
                    <Text>Use Camera</Text>
                    <MaterialIcons name="camera-alt" size={16} color="#D3D4D6" style={{marginHorizontal: 5}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onGallery} style={styles.button}>
                    <Text>Use Gallery</Text>
                    <MaterialIcons name="photo-library" size={16} color="#D3D4D6" style={{marginHorizontal: 5}}/>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: '#D3D4D6', borderRadius: 10, borderWidth: 2, borderColor: '#D3D4D6',
                    width: Dimensions.get('window').width - 60,
                    height: Dimensions.get('window').width - 60,
                }}>
                    <Image source={{
                        uri: image
                    }} style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10
                    }}/>
                </View>
                <TouchableOpacity onPress={onSave} style={styles.button}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ImagePickerScreen;
