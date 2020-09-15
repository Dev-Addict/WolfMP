import React, {FC} from "react";
import {View} from "react-native";

import Text from "../../components/Text";
import styles from "../../styles";

type Props = {
    route: any;
    navigation: any;
}

const SongScreen: FC<Props> = ({route}) => {
    console.log(route?.params?.id);

    return (
        <View style={styles.screen}>
            <Text>SongScreen</Text>
        </View>
    );
};

export default SongScreen;
