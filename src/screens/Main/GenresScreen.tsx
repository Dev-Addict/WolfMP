import React, {FC} from "react";
import {View} from "react-native";
import GenresList from "../../components/helpers/song/GenreList";
import styles from "../../styles";

type Props = {
    navigation: any;
};

const GenresScreen: FC<Props> = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <GenresList navigation={navigation}/>
        </View>
    );
};

export default GenresScreen;
