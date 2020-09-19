import React, {FC, useState} from "react";
import {FlatList} from "react-native";
import Genre from "../../../models/Genre";


import SearchBox from "../SearchBox";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import Artist from "../../../models/Artist";
import GenreItem from "./GenreItem";
import filterGenres from "../../../utils/filters/filterGenres";

type Props = {
    navigation: any;
    route: any;
};

const GenresList: FC<Props> = ({navigation, route}) => {
    const [searchValue, setSearchValue] = useState('');

    let songs = useSelector(({songs: {songs}}: RootState) => songs).filter(({isExcluded}) => !isExcluded);

    if (route?.params?.isFav)
        songs = songs.filter(song => song.isFav);

    const genres: Genre[] = filterGenres(Array.from(new Set(songs.map(({genre}) => genre)))
        .map(genreName => ({name: genreName || 'unknown'})), searchValue);

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue} isFav={route?.params?.isFav}/>
            <FlatList data={genres} renderItem={props => <GenreItem navigation={navigation} {...props}/>}
                      keyExtractor={({name}: Artist) => name} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} initialNumToRender={20} windowSize={41} numColumns={2}
                      columnWrapperStyle={{justifyContent: 'space-around'}}/>
        </>
    );
};

export default GenresList;
