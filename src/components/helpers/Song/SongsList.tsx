import React, {FC, useState} from "react";
import {FlatList} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import SongItem from "./SongItem";
import SearchBox from "../SearchBox";
import AlbumList from "./AlbumList";
import filterSongs from "../../../utils/filterSongs";
import ArtistList from "./ArtistList";

type Props = {
    navigation: any;
    route: any;
}

const SongsList: FC<Props> = ({navigation, route}) => {
    const [searchValue, setSearchValue] = useState('');

    let songs = useSelector(({songs: {songs}}: RootState) => songs);
    let albumArtists;

    songs = filterSongs(songs, searchValue);

    if (route?.params?.isFromAlbumScreen) {
        songs = songs.filter(song => song.album === route.params.album);
        albumArtists = Array.from(new Set(songs.map(song => song.artist))).join('/');
    }

    if (route?.params?.isFromArtistScreen) {
        songs = songs.filter(song => song.artist === route.params.artist);
    }

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            {route?.params?.isFromAlbumScreen &&
            <>
                <ArtistList navigation={navigation} isFromAlbum={true} albumArtists={albumArtists}/>
                <AlbumList navigation={navigation} leadAlbum={route.params.album} isHorizontal={true}/>
            </>
            }
            {route?.params?.isFromArtistScreen &&
            <AlbumList navigation={navigation} isHorizontal={true} artist={route.params.artist}/>
            }
            <FlatList data={songs} renderItem={props => <SongItem navigation={navigation} {...props}/>}
                      keyExtractor={({id}: Song) => id} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41} contentContainerStyle={{alignSelf: 'baseline'}}/>
        </>
    );
};

export default SongsList;
