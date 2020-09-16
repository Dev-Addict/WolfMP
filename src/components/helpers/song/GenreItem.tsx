import React, {PureComponent} from "react";
import {TouchableOpacity} from "react-native";

import Genre from "../../../models/Genre";
import Text from "../../Text";
import styles from "../../../styles";

type Props = {
    navigation: any;
    item: Genre;
};

class GenreItem extends PureComponent<Props> {
    render() {
        const {item: {name}} = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.push('Songs', {
                    genre: name,
                    isFromGenreScreen: true
                });
            }} style={[styles.card, styles.content, {
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

export default GenreItem;
