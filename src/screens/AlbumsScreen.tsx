import React, {FC, useState} from "react";
import {View} from "react-native";
import SearchBox from "../components/helpers/SearchBox";
import AlbumList from "../components/helpers/Song/AlbumList";

type Props = {
    navigation: any;
};

const AlbumsScreen: FC<Props> = ({navigation}) => {

    return (
        <View>
            <AlbumList navigation={navigation}/>
        </View>
    );
};

export default AlbumsScreen;
