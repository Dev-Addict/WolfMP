import React, {PureComponent} from "react";
import {View} from "react-native";
import Artist from "../../../models/Artist";
import Text from "../../Text";
import styles from "../../../styles";

type Props = {
    navigation: any;
    item: Artist;
};

class ArtistItem extends PureComponent<Props> {
    render() {
        return (
            <View style={[styles.card, styles.content, {width: '45%', margin: undefined, marginVertical: 10}]}>
                <Text>{this.props.item.name}</Text>
            </View>
        );
    }
}

export default ArtistItem;
