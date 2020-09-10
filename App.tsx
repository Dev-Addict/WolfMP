import React from 'react';
import {Provider} from "react-redux";
import {useFonts} from 'expo-font';

import MainNavigator from "./src/navigation/MainNavigation";
import {init as initializeDb} from "./src/db";
import store from "./src/store";
import {AppLoading} from "expo";

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
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
    );
};


export default App;
