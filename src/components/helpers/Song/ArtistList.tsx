import React, {FC, useState} from "react";
import {FlatList} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import SearchBox from "../SearchBox";
import Artist from "../../../models/Artist";
import ArtistItem from "./ArtistItem";
import filterArtists from "../../../utils/filters/filterArtists";

type Props = {
    navigation: any;
    isFromAlbum?: boolean;
    albumArtists?: string;
};

const ArtistList: FC<Props> = ({navigation, isFromAlbum = false, albumArtists}) => {
    const [searchValue, setSearchValue] = useState('');

    const songs = useSelector(({songs: {songs}}: RootState) => songs);
    let artists: Artist[];
    if (isFromAlbum)
        artists = albumArtists!.split('/').map(artistName => ({
            name: artistName || 'unknown'
        })).sort((a1, a2) =>
            a1.name.toLowerCase().localeCompare(a2.name.toLowerCase()));
    else
        artists = Array.from(new Set(songs.map(({artist}) => artist))).map(artistName => ({
            name: artistName || 'unknown'
        })).sort((a1, a2) =>
            a1.name.toLowerCase().localeCompare(a2.name.toLowerCase()));

    artists = filterArtists(artists, searchValue);

    return (
        <>
            {!isFromAlbum &&
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            }
            <FlatList data={artists}
                      renderItem={props => <ArtistItem navigation={navigation} isHorizontal={isFromAlbum} {...props}/>}
                      keyExtractor={({name}: Artist) => name} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41} horizontal={isFromAlbum}
                      columnWrapperStyle={isFromAlbum ? undefined : {justifyContent: 'space-around'}}
                      numColumns={isFromAlbum ? undefined : 2}/>
        </>
    );
};

export default ArtistList;
