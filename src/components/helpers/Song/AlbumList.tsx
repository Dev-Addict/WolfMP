import React, {FC, useState} from "react";
import {Dimensions, FlatList, View} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import Album from "../../../models/Album";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import SearchBox from "../SearchBox";

type Props = {
    navigation: any
}

const AlbumList: FC<Props> = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');

    const songs = useSelector(({songs: {songs}}: RootState) => songs);
    const albums: Album[] = Array.from(new Set(songs.map(({album}) => album)))
        .filter(albumName => !albumName?.includes('/')).map((albumName): Album => ({
            name: albumName || 'unknown',
            songAmount: songs.filter(song => song.album?.startsWith(albumName!)).length,
            subAlbums: Array.from(new Set(songs.filter(song => song.album?.startsWith(albumName + '/')
                && !song.album?.substr(albumName!.length + 1).includes('/'))
                .map(song => song.album))).length,
            artists: Array.from(new Set(
                songs.filter(song => song.album?.startsWith(albumName!)).map(song => song.artist || 'unknown')))
        })).sort((a1, a2) => a1.name.localeCompare(a2.name));

    const unknownIndex = albums.findIndex(({name}) => name === 'unknown');
    albums[unknownIndex].songAmount = songs.filter(song => !song.album).length;
    albums[unknownIndex].artists = Array.from(new Set(
        songs.filter(song => !song.album).map(song => song.artist || 'unknown')));

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            <FlatList data={albums} renderItem={props => <AlbumItem navigation={navigation} {...props}/>}
                      keyExtractor={({name}: Album) => name} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} style={{height: (Dimensions.get('window').height - 60)}}
                      initialNumToRender={20} windowSize={41}/>
        </>
    );
};

export default AlbumList;
