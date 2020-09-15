import React, {FC} from "react";
import {View} from "react-native";
import LottieView from 'lottie-react-native';

import styles from "../../styles";

const LoadingScreen: FC = () => {
    return (
        <View style={styles.centerContainer}>
            <LottieView source={require('../../../assets/animations/loading.json')} autoPlay loop style={{width: 100, height: 100}}/>
        </View>
    );
};

export default LoadingScreen;
