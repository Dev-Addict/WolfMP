import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {useDispatch} from "react-redux";

import {thunkInitializeApp} from "../thunk";

const MainNavigator = () => {
    const dispatch = useDispatch();

    dispatch(thunkInitializeApp());

    return (
        <NavigationContainer>
        </NavigationContainer>
    );
};

export default MainNavigator;
