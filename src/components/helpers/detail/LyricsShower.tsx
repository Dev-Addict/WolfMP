import React, {FC} from 'react';
import {View} from "react-native";

import Text from "../../Text";
import Lyrics from "../../../models/Lyrics";
import styles from "../../../styles";

type Props = {
    lyrics?: Lyrics;
    position: number;
};

const LyricsShower: FC<Props> = ({lyrics, position}) => {
    if (!lyrics || lyrics.length === 0)
        return <></>;

    let index = 0;

    for (let i = 0; i < lyrics.length; i++)
        if (lyrics[i].time! > position) {
            index = i - 1;
            break;
        }

    let main = 1;

    if (index < 1) {
        index = 1;
        main = 0;
    }

    if (index > lyrics.length - 2) {
        index = lyrics.length - 2;
        main = 2;
    }

    return (
        <View style={[styles.card, styles.content, {width: '100%'}]}>
            <View style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
                <Text numberOfLines={3} style={[{textAlign: 'center'}, main === 0 ? {} : {opacity: 0.5}]}>
                    {lyrics[index - 1]?.text}
                </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
                <Text numberOfLines={3} style={[{textAlign: 'center'}, main === 1 ? {} : {opacity: 0.5}]}>
                    {lyrics[index]?.text}
                </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
                <Text numberOfLines={3} style={[{textAlign: 'center'}, main === 2 ? {} : {opacity: 0.5}]}>
                    {lyrics[index + 1]?.text}
                </Text>
            </View>
        </View>
    );
};

export default LyricsShower;
