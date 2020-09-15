import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import SongScreen from "../screens/Detail/SongScreen";
import EditScreen from "../screens/Detail/EditScreen";

const DetailStack = createStackNavigator();

const DetailNavigation = () => {
    return (
        <DetailStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#262A2F'
            },
            headerTintColor: '#D3D4D6'
        }}>
            <DetailStack.Screen name="Song" component={SongScreen}/>
            <DetailStack.Screen name="Edit" component={EditScreen}/>
        </DetailStack.Navigator>
    );
};

export default DetailNavigation;
