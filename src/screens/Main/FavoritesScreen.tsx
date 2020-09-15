import React, {useState} from "react";
import {View} from "react-native";

import SearchBox from "../../components/helpers/SearchBox";

const FavoritesScreen = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <View>
            <SearchBox value={searchValue} setValue={setSearchValue}/>
        </View>
    );
};

export default FavoritesScreen;
