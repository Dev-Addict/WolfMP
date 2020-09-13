import React, {useEffect} from "react";
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-native";

import SideTab from "./SideTab";
import LoadingScreen from "../screens/LoadingScreen";
import {thunkInitializeApp} from "../thunk";
import {RootState} from "../store";

const MainNavigator = () => {
    const dispatch = useDispatch();

    const isLoading = useSelector(({isLoading}: RootState) => isLoading);

    useEffect(() => {
        dispatch(thunkInitializeApp());
    }, []);

    return (
        <NavigationContainer>
            <Modal visible={isLoading} transparent={false} animationType="slide">
                <LoadingScreen/>
            </Modal>
            <SideTab/>
        </NavigationContainer>
    );
};

export default MainNavigator;
