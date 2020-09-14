import React, {FC} from "react";
import {View} from "react-native";
import GenresList from "../components/helpers/Song/GenreList";

type Props = {
    navigation: any;
};

const GenresScreen: FC<Props> = ({navigation}) => {
    return (
        <View>
            <GenresList navigation={navigation}/>
        </View>
    );
};

export default GenresScreen;
