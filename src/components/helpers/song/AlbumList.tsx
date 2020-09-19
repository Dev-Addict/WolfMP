import React, {FC, useState} from "react";
import {FlatList} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import Album from "../../../models/Album";
import AlbumItem from "./AlbumItem";
import SearchBox from "../SearchBox";
import createAlbumList from "../../../utils/createAlbumList";
import filterAlbums from "../../../utils/filters/filterAlbums";

type Props = {
    navigation: any;
    leadAlbum?: string;
    isHorizontal?: boolean;
    artist?: string;
    hideSearchBar?: boolean;
    route: any;
}

const AlbumList: FC<Props> = ({navigation, leadAlbum, isHorizontal = false, artist, hideSearchBar = false, route}) => {
    const [searchValue, setSearchValue] = useState('');

    let songs = useSelector(({songs: {songs}}: RootState) => songs).filter(({isExcluded}) => !isExcluded);
    let albums: Album[];

    if (route?.params?.isFav)
        songs = songs.filter(song => song.isFav);

    if (leadAlbum)
        albums = createAlbumList(Array.from(new Set(songs.map(({album}) => album)))
            .filter(albumName => albumName?.startsWith(leadAlbum + '/')), songs);
    else if (artist)
        albums = createAlbumList(Array.from(new Set(songs.filter(song => song.artist === artist)
            .map(({album}) => album))), songs);
    else
        albums = createAlbumList(Array.from(new Set(songs.map(({album}) => album)))
            .filter(albumName => !albumName?.includes('/')), songs);

    const unknownIndex = albums.findIndex(({name}) => name === 'unknown');

    if (unknownIndex !== -1) {
        albums[unknownIndex].songAmount = songs.filter(song => !song.album).length;
        albums[unknownIndex].artists = Array.from(new Set(
            songs.filter(song => !song.album).map(song => song.artist || 'unknown')));
    }

    albums = filterAlbums(albums, searchValue);

    return (
        <>
            {!leadAlbum && !artist && !hideSearchBar &&
            <SearchBox value={searchValue} setValue={setSearchValue} isFav={route?.params?.isFav}/>
            }
            <FlatList data={albums} renderItem={props => <AlbumItem navigation={navigation} {...props}/>}
                      keyExtractor={({name}: Album) => name} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41}
                      horizontal={isHorizontal} style={{marginBottom: 0}}/>
        </>
    );
};

export default AlbumList;
