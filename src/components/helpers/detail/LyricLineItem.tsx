import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import Lyrics from "../../../models/Lyrics";
import LyricsLine from "../../../models/LyricsLine";
import styles from "../../../styles";

type Props = {
    setLyrics: Dispatch<SetStateAction<Lyrics>>;
    lyrics: Lyrics;
    index: number;
    item: LyricsLine;
};

const LyricsLineItem: FC<Props> = ({setLyrics, lyrics, index, item}) => {
    const [isTimeInputFocused, setTimeInputFocused] = useState(false);
    const [isTextInputFocused, setTextInputFocused] = useState(false);

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <MaterialIcons name="close" size={24} color="#D3D4D6" onPress={() => {
                const newLyrics = [...lyrics];
                newLyrics.splice(index, 1);
                setLyrics(newLyrics);
            }}/>
            <TextInput onChangeText={value => {
                const newLyricsLine = {...lyrics[index]};
                if (!isNaN(+value))
                    newLyricsLine.time = +value;
                const newLyrics = [...lyrics];
                newLyrics[index] = newLyricsLine;
                setLyrics(newLyrics);
            }} value={item.time?.toString() || ''}
                       style={[styles.input, {width: 50}, isTimeInputFocused ? styles.inputFocused : {}]}
                       keyboardType={"decimal-pad"}
                       placeholder="time" onFocus={() => setTimeInputFocused(true)}
                       onBlur={() => setTimeInputFocused(false)}/>
            <TextInput onChangeText={value => {
                const newLyricsLine = {...lyrics[index]};
                newLyricsLine.text = value;
                const newLyrics = [...lyrics];
                newLyrics[index] = newLyricsLine;
                setLyrics(newLyrics);
            }} value={item.text} style={[styles.input, {flex: 1}, isTextInputFocused ? styles.inputFocused : {}]}
                       placeholder="lyrics"
                       onFocus={() => setTextInputFocused(true)} onBlur={() => setTextInputFocused(false)}/>
        </View>
    );
};

export default LyricsLineItem;
