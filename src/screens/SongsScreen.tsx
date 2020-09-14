import React, {FC, useState} from "react";
import {View, Text} from "react-native";

import SearchBox from "../components/helpers/SearchBox";
import SongsList from "../components/helpers/Song/SongsList";

type Props = {
    navigation: any
}

const SongsScreen: FC<Props> = ({navigation}) => {

    return (
        <View>
            <SongsList navigation={navigation}/>
        </View>
    );
};

export default SongsScreen;
