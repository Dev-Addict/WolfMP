import React, {FC} from "react";
import {View} from "react-native";

import SongsList from "../../components/helpers/song/SongsList";
import styles from "../../styles";

type Props = {
    navigation: any,
    route: any
}

const SongsScreen: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.screen}>
            <SongsList navigation={navigation} route={route}/>
        </View>
    );
};

export default SongsScreen;
