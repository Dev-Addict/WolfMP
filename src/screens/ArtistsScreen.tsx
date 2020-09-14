import React, {FC} from "react";
import {View} from "react-native";

import ArtistList from "../components/helpers/Song/ArtistList";

type Props = {
    navigation: any;
};

const ArtistsScreen: FC<Props> = ({navigation}) => {
    return (
        <View>
            <ArtistList navigation={navigation}/>
        </View>
    );
};

export default ArtistsScreen;
