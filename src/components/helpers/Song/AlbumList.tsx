import React, {FC, useState} from "react";
import {Dimensions, FlatList} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import Album from "../../../models/Album";
import AlbumItem from "./AlbumItem";
import SearchBox from "../SearchBox";
import createAlbumList from "../../../utils/createAlbumList";

type Props = {
    navigation: any;
    leadAlbum?: string;
}

const AlbumList: FC<Props> = ({navigation, leadAlbum}) => {
    const [searchValue, setSearchValue] = useState('');

    const songs = useSelector(({songs: {songs}}: RootState) => songs);
    let albums: Album[];
    if (!leadAlbum)
        albums = createAlbumList(Array.from(new Set(songs.map(({album}) => album)))
            .filter(albumName => !albumName?.includes('/')), songs);
    else
        albums = createAlbumList(Array.from(new Set(songs.map(({album}) => album)))
            .filter(albumName => albumName?.startsWith(leadAlbum + '/')), songs);

    const unknownIndex = albums.findIndex(({name}) => name === 'unknown');

    if (unknownIndex !== -1) {
        albums[unknownIndex].songAmount = songs.filter(song => !song.album).length;
        albums[unknownIndex].artists = Array.from(new Set(
            songs.filter(song => !song.album).map(song => song.artist || 'unknown')));
    }

    return (
        <>
            {!leadAlbum &&
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            }
            <FlatList data={albums} renderItem={props => <AlbumItem navigation={navigation} {...props}/>}
                      keyExtractor={({name}: Album) => name} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41}/>
        </>
    );
};

export default AlbumList;
