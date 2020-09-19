import React, {FC} from "react";
import {View} from "react-native";
import GenresList from "../../components/helpers/song/GenreList";
import styles from "../../styles";

type Props = {
    navigation: any;
    route: any;
};

const GenresScreen: FC<Props> = ({navigation, route}) => {
    return (
        <View style={styles.screen}>
            <GenresList navigation={navigation} route={route}/>
        </View>
    );
};

export default GenresScreen;
