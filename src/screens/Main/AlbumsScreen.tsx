import React, {FC} from "react";
import {View} from "react-native";

import AlbumList from "../../components/helpers/song/AlbumList";
import styles from "../../styles";

type Props = {
    navigation: any;
};

const AlbumsScreen: FC<Props> = ({navigation}) => {

    return (
        <View style={styles.screen}>
            <AlbumList navigation={navigation}/>
        </View>
    );
};

export default AlbumsScreen;
