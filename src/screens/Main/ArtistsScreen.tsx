import React, {FC} from "react";
import {View} from "react-native";

import ArtistList from "../../components/helpers/song/ArtistList";
import styles from "../../styles";

type Props = {
    navigation: any;
};

const ArtistsScreen: FC<Props> = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <ArtistList navigation={navigation}/>
        </View>
    );
};

export default ArtistsScreen;
