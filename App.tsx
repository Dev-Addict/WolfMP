import React from 'react';
import {View} from "react-native";
import {Provider} from "react-redux";
import {useFonts} from 'expo-font';

import MainNavigator from "./src/navigation/MainNavigation";
import {init as initializeDb} from "./src/db";
import store from "./src/store";
import {AppLoading} from "expo";

import styles from "./src/styles";
import {StatusBar} from "expo-status-bar";

initializeDb().then(() => {
    console.log('DB initialized.');
});

const App = () => {
    const [isFontLoaded] = useFonts({
        'consolas': require('./assets/fonts/consolas.ttf')
    });

    if (!isFontLoaded)
        return <AppLoading/>;

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2D3136" translucent={false} hidden={false} style="inverted"/>
            <Provider store={store}>
                <MainNavigator/>
            </Provider>
        </View>
    );
};


export default App;
