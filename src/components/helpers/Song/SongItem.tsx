import React, {PureComponent} from "react";
import {View} from "react-native";

import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Song} from "../../../store/songs/types";
import Text from "../../Text";
import styles from "../../../styles";

type Props = {
    item: Song,
    navigation: any
};

class SongItem extends PureComponent<Props> {
    render() {
        const {
            title,
            album,
            artist,
            genre,
            isFav,
            id
        } = this.props.item;

        return (
            <View style={styles.songItem}>
                <Ionicons name="md-more" size={24} color="#D3D4D6" style={[styles.icon, {paddingVertical: 5}]}/>
                <View style={{width: '90%'}}>
                    <Text numberOfLines={1}>{title} - {genre || 'unknown'}</Text>
                    <Text numberOfLines={1}>{album || 'unknown'} - {artist || 'unknown'}</Text>
                </View>
            </View>
        );
    }
}

export default SongItem;
