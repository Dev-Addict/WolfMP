import React, {FC, useState} from "react";
import {Dimensions, TextInput, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';

import styles from "../../styles";

type Props = {
    value: string;
    setValue: (value: string) => void;
    isFav?: boolean;
};

const SearchBox: FC<Props> = ({value, setValue, isFav}) => {
    const [isFocused, setFocused] = useState(false);

    return (
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="md-search" size={24} color="#D3D4D6"/>
            <TextInput value={value} onChangeText={setValue}
                       style={[styles.input, isFocused ? styles.inputFocused : {},
                           isFav ? {width: Dimensions.get('window').width - Dimensions.get('window').width * 3 / 21 - 20 - 50 - (Dimensions.get('window').width - Dimensions.get('window').width * 3 / 21) * 3 / 21 - 10} : {}]}
                       placeholder="Search..."
                       onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
        </View>
    );
};

export default SearchBox;
