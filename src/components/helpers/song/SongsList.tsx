import React, {FC, useState} from "react";
import {FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import SongItem from "./SongItem";
import SearchBox from "../SearchBox";
import AlbumList from "./AlbumList";
import filterSongs from "../../../utils/filters/filterSongs";
import ArtistList from "./ArtistList";
import PlayScope from "../../../models/PlayScope";
import {setFav, setPlayScope, setScopeValue} from "../../../store/audio/actions";
import {thunkLoadSong} from "../../../thunk";

type Props = {
    navigation: any;
    route: any;
}

const SongsList: FC<Props> = ({navigation, route}) => {
    const [searchValue, setSearchValue] = useState('');

    let songs = useSelector(({songs: {songs}}: RootState) => songs).filter(({isExcluded}) => !isExcluded);
    let albumArtists;

    if (route?.params?.isFav)
        songs = songs.filter(song => song.isFav);

    let playScope = PlayScope.NONE;
    let scopeValue: string | undefined = undefined;

    const dispatch = useDispatch();

    songs = filterSongs(songs, searchValue);

    if (route?.params?.isFromAlbumScreen) {
        playScope = PlayScope.ALBUM;
        scopeValue = route.params.album;
        songs = songs.filter(song => song.album === route.params.album);
        albumArtists = Array.from(new Set(songs.map(song => song.artist))).join('/');
    }

    if (route?.params?.isFromArtistScreen) {
        playScope = PlayScope.ARTIST;
        scopeValue = route.params.artist;
        songs = songs.filter(song => song.artist === route.params.artist);
    }

    if (route?.params?.isFromGenreScreen) {
        playScope = PlayScope.GENRE;
        scopeValue = route.params.genre;
        songs = songs.filter(song => song.genre === route.params.genre);
    }

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue} isFav={route?.params?.isFav}/>
            {route?.params?.isFromAlbumScreen &&
            <>
                <ArtistList navigation={navigation} isFromAlbum={true} albumArtists={albumArtists} route={route}/>
                <AlbumList navigation={navigation} leadAlbum={route.params.album} isHorizontal={true} hideSearchBar route={route}/>
            </>
            }
            {route?.params?.isFromArtistScreen &&
            <AlbumList navigation={navigation} isHorizontal={true} artist={route.params.artist} hideSearchBar route={route}/>
            }
            <FlatList data={songs} renderItem={props => <SongItem navigation={navigation} {...props} onBodyPress={(id: string) => {
                dispatch(setPlayScope(playScope));
                dispatch(setScopeValue(scopeValue));
                dispatch(setFav(route?.params?.isFav));
                dispatch(thunkLoadSong(id, true));
            }}/>}
                      keyExtractor={({id}: Song) => id} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41}
                      contentContainerStyle={{alignSelf: 'baseline'}}/>
        </>
    );
};

export default SongsList;
