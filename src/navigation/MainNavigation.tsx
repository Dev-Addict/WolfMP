import React, {useEffect} from "react";
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-native";

import SideTabNavigation from "./SideTabNavigation";
import DetailNavigation from "./DetailNavigation";
import LoadingScreen from "../screens/Main/LoadingScreen";
import {thunkInitializeApp} from "../thunk";
import {RootState} from "../store";

const Stack = createStackNavigator();

const MainNavigationStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="SideTab" component={SideTabNavigation}/>
            <Stack.Screen name="Detail" component={DetailNavigation}/>
        </Stack.Navigator>
    );
};

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
            <MainNavigationStack/>
        </NavigationContainer>
    );
};

export default MainNavigator;
