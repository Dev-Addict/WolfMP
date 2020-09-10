import React from 'react';
import {Provider} from "react-redux";

import MainNavigator from "./src/navigation/MainNavigation";
import {init as initializeDb} from "./src/db";
import store from "./src/store";

initializeDb().then(() => {
    console.log('DB initialized.');
});

const App = () => {
    return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
    );
};


export default App;
