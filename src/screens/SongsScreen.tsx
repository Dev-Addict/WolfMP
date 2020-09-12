import React, {FC, useState} from "react";
import {View, Text} from "react-native";

import SearchBox from "../components/helpers/SearchBox";
import SongsList from "../components/helpers/Song/SongsList";

type Props = {
    navigation: any
}

const SongsScreen: FC<Props> = ({navigation}) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <View>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
            <SongsList navigation={navigation}/>
        </View>
    );
};

export default SongsScreen;
