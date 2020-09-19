import React, {PureComponent} from "react";
import {TouchableOpacity, View} from "react-native";

import {Ionicons} from '@expo/vector-icons';
import {Song} from "../../../store/songs/types";
import Text from "../../Text";
import styles from "../../../styles";

type Props = {
    item: Song;
    navigation: any;
    onBodyPress: (id: string) => void;
};

class SongItem extends PureComponent<Props> {
    render() {
        const {
            title,
            album,
            artist,
            genre,
            id
        } = this.props.item;

        return (
            <View style={styles.songItem}>
                <Ionicons name="md-more" size={24} color="#D3D4D6" style={[styles.icon, {paddingVertical: 5}]}/>
                <TouchableOpacity onPress={() => this.props.onBodyPress(id)}>
                    <View style={{width: '90%'}}>
                        <Text numberOfLines={1}>{title} - {genre || 'unknown'}</Text>
                        <Text numberOfLines={1}>{album || 'unknown'} - {artist || 'unknown'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SongItem;
