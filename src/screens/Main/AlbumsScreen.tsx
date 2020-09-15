import React, {FC, useState} from "react";
import {View} from "react-native";
import SearchBox from "../../components/helpers/SearchBox";
import AlbumList from "../../components/helpers/Song/AlbumList";
import styles from "../../styles";

type Props = {
    navigation: any;
};

const AlbumsScreen: FC<Props> = ({navigation}) => {

    return (
        <View style={styles.screen}>
            <AlbumList navigation={navigation}/>
        </View>
    );
};

export default AlbumsScreen;
