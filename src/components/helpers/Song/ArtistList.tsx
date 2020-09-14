import React, {FC, useState} from "react";
import {FlatList} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import SearchBox from "../SearchBox";
import Artist from "../../../models/Artist";
import ArtistItem from "./ArtistItem";

type Props = {
    navigation: any;
};

const ArtistList: FC<Props> = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');

    const songs = useSelector(({songs: {songs}}: RootState) => songs);
    const artists: Artist[] = Array.from(new Set(songs.map(({artist}) => artist))).map(artistName => ({
        name: artistName || 'unknown'
    })).sort((a1, a2) =>
        a1.name.toLowerCase().localeCompare(a2.name.toLowerCase()));

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            <FlatList data={artists} renderItem={props => <ArtistItem navigation={navigation} {...props}/>}
                      keyExtractor={({name}: Artist) => name} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41} numColumns={2}
                      columnWrapperStyle={{justifyContent: 'space-around'}} style={{marginBottom: 120}}/>
        </>
    );
};

export default ArtistList;
