import React, {FC, useState} from "react";
import {View, Text} from "react-native";

import SearchBox from "../../components/helpers/SearchBox";
import SongsList from "../../components/helpers/Song/SongsList";
import styles from "../../styles";

type Props = {
    navigation: any,
    route: any
}

const SongsScreen: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.screen}>
            <SongsList navigation={navigation} route={route}/>
        </View>
    );
};

export default SongsScreen;
