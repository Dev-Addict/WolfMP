import React, {FC, useState} from "react";
import {Dimensions, FlatList, View} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import SongItem from "./SongItem";
import SearchBox from "../SearchBox";
import AlbumList from "./AlbumList";

type Props = {
    navigation: any;
    route: any;
}

const SongsList: FC<Props> = ({navigation, route}) => {
    const [searchValue, setSearchValue] = useState('');

    let songs = useSelector(({songs: {songs}}: RootState) => songs);
    let albums;

    if (route?.params?.isFromAlbumScreen) {
        songs = songs.filter(song => song.album === route.params.album);
    }

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            {route?.params?.isFromAlbumScreen &&
            <AlbumList navigation={navigation} leadAlbum={route.params.album}/>
            }
            <FlatList data={songs} renderItem={props => <SongItem navigation={navigation} {...props}/>}
                      keyExtractor={({id}: Song) => id} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41}/>
        </>
    );
};

export default SongsList;
