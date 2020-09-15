import React, {FC} from "react";
import {TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialIcons} from '@expo/vector-icons';

import Text from "../../components/Text";
import styles from "../../styles";
import {RootState} from "../../store";
import {thunkUpdateSong} from "../../thunk";

type Props = {
    route: any;
    navigation: any;
}

const SongScreen: FC<Props> = ({route, navigation}) => {
    const id = route?.params?.id;

    if (!id)
        navigation.navigate('SideTab', {
            screen: 'Songs'
        });

    const dispatch = useDispatch();

    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === id)!;

    navigation.setOptions({
        title: song.title,
        headerRight: () => song.isFav ?
            <TouchableOpacity style={{margin: 20}} onPress={() => {
                dispatch(thunkUpdateSong({...song, isFav: false}));
            }}>
                <MaterialIcons name="favorite" size={24} color="#D3D4D6"/>
            </TouchableOpacity> :
            <TouchableOpacity style={{margin: 20}} onPress={() => {
                dispatch(thunkUpdateSong({...song, isFav: true}));
            }}>
                <MaterialIcons name="favorite-border" size={24} color="#D3D4D6"/>
            </TouchableOpacity>
    });

    return (
        <View style={styles.screen}>
            <Text>SongScreen</Text>
        </View>
    );
};

export default SongScreen;
