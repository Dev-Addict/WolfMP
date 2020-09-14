import React, {FC, useState} from "react";
import {Dimensions, FlatList, View} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import SongItem from "./SongItem";
import SearchBox from "../SearchBox";

type Props = {
    navigation: any
}

const SongsList: FC<Props> = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');

    const songs = useSelector(({songs: {songs}}: RootState) => songs);

    return (
        <>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            <FlatList data={songs} renderItem={props => <SongItem navigation={navigation} {...props}/>}
                      keyExtractor={({id}: Song) => id} removeClippedSubviews maxToRenderPerBatch={20}
                      updateCellsBatchingPeriod={200} style={{height: Dimensions.get('window').height - 50}}
                      initialNumToRender={20} windowSize={41}/>
        </>
    );
};

export default SongsList;
