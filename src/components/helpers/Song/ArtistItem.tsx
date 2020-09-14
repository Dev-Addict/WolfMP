import React, {PureComponent} from "react";
import {TouchableOpacity, View} from "react-native";

import Artist from "../../../models/Artist";
import Text from "../../Text";
import styles from "../../../styles";

type Props = {
    navigation: any;
    item: Artist;
    isHorizontal?: boolean;
};

class ArtistItem extends PureComponent<Props> {
    render() {
        const {item: {name}, isHorizontal} = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.push('Songs', {
                    artist: name,
                    isFromArtistScreen: true
                });
            }} style={isHorizontal ? [styles.card, styles.content, {height: 40}] : [styles.card, styles.content, {
                width: '45%',
                margin: undefined,
                marginVertical: 10,
                height: 40
            }]}>
                <Text numberOfLines={1}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

export default ArtistItem;
