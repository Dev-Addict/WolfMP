import React from 'react';
import {Provider} from "react-redux";

import MainNavigator from "./src/navigation/MainNavigation";
import store from "./src/store";

const App = () => {
    return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
    );
};


export default App;
