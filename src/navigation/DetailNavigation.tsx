import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import SongScreen from "../screens/Detail/SongScreen";
import EditScreen from "../screens/Detail/EditScreen";
import LyricsScreen from "../screens/Detail/LyricsScreen";

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
            <DetailStack.Screen name="Lyrics" component={LyricsScreen}/>
        </DetailStack.Navigator>
    );
};

export default DetailNavigation;
