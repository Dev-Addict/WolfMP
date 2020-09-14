import React, {PureComponent} from "react";
import {View} from "react-native";

import Text from "../../Text";
import Album from "../../../models/Album";
import styles from "../../../styles";

type Props = {
    item: Album,
    navigation: any
};

class AlbumItem extends PureComponent<Props> {
    render() {
        const {name, songAmount, subAlbums, artists} = this.props.item;

        return (
            <View style={[styles.card, styles.content]}>
                <Text size={3} numberOfLines={1}>{name}</Text>
                <Text numberOfLines={1}>Songs: {songAmount}</Text>
                <Text numberOfLines={1}>Sub Albums: {subAlbums}</Text>
                <Text numberOfLines={1}>Artists: {artists.join('/')}</Text>
            </View>
        );
    }
}

export default AlbumItem;
