import React, {FC} from "react";
import {View} from "react-native";

import ArtistList from "../../components/helpers/song/ArtistList";
import styles from "../../styles";

type Props = {
    navigation: any;
    route: any;
};

const ArtistsScreen: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.screen}>
            <ArtistList navigation={navigation} route={route}/>
        </View>
    );
};

export default ArtistsScreen;
