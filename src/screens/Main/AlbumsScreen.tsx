import React, {FC} from "react";
import {View} from "react-native";

import AlbumList from "../../components/helpers/song/AlbumList";
import styles from "../../styles";

type Props = {
    navigation: any;
    route: any;
};

const AlbumsScreen: FC<Props> = ({navigation, route}) => {

    return (
        <View style={styles.screen}>
            <AlbumList navigation={navigation} route={route}/>
        </View>
    );
};

export default AlbumsScreen;
