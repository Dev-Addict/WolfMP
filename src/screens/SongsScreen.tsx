import React, {useState} from "react";
import {View, Text} from "react-native";

import SearchBox from "../components/helpers/SearchBox";

const SongsScreen = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <View>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
        </View>
    );
};

export default SongsScreen;
