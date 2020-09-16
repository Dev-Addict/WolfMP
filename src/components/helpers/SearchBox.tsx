import React, {FC, useState} from "react";
import {TextInput, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';

import styles from "../../styles";

type Props = {
    value: string;
    setValue: (value: string) => void
};

const SearchBox: FC<Props> = ({value, setValue}) => {
    const [isFocused, setFocused] = useState(false);

    return (
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="md-search" size={24} color="#D3D4D6"/>
            <TextInput value={value} onChangeText={setValue}
                       style={[styles.input, isFocused ? styles.inputFocused : {}]} placeholder="Search..."
                       onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
        </View>
    );
};

export default SearchBox;
