import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

import createSideTabBar from "./navigators/createSideTabBar";
import SongsScreen from "../screens/Main/SongsScreen";
import AlbumsScreen from "../screens/Main/AlbumsScreen";
import ArtistsScreen from "../screens/Main/ArtistsScreen";
import GenresScreen from "../screens/Main/GenresScreen";
import PlaylistsScreen from "../screens/Main/PlaylistsScreen";
import SettingsScreen from "../screens/Main/SettingsScreen";
import FavoritesScreen from "../screens/Main/FavoritesScreen";

const AlbumsStack = createStackNavigator();

const Albums = () => {
    return (
        <AlbumsStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <AlbumsStack.Screen name="Albums" component={AlbumsScreen}/>
            <AlbumsStack.Screen name="Songs" component={SongsScreen}/>
        </AlbumsStack.Navigator>
    );
};

const ArtistsStack = createStackNavigator();

const Artists = () => {
    return (
        <ArtistsStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <ArtistsStack.Screen name="Artists" component={ArtistsScreen}/>
            <ArtistsStack.Screen name="Songs" component={SongsScreen}/>
        </ArtistsStack.Navigator>
    );
};

const GenresStack = createStackNavigator();

const Genres = () => {
    return (
        <GenresStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <GenresStack.Screen name="Genres" component={GenresScreen}/>
            <GenresStack.Screen name="Songs" component={SongsScreen}/>
        </GenresStack.Navigator>
    );
};

const SideTabNavigator = createSideTabBar();

const SideTabNavigation = () => {
    return (
        <SideTabNavigator.Navigator initialRouteName="Songs">
            <SideTabNavigator.Screen name="Songs" component={SongsScreen} options={{
                icon: ({color, size}) => (<MaterialIcons name="library-music" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Albums" component={Albums} options={{
                icon: ({color, size}) => (<Ionicons name="ios-albums" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Artists" component={Artists} options={{
                icon: ({color, size}) => (<MaterialCommunityIcons name="artist" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Genres" component={Genres} options={{
                icon: ({color, size}) => (<FontAwesome5 name="compact-disc" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Playlists" component={PlaylistsScreen} options={{
                icon: ({color, size}) => (<MaterialCommunityIcons name="playlist-music" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Favorites" component={FavoritesScreen} options={{
                icon: ({color, size}) => (<MaterialIcons name="favorite" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Settings" component={SettingsScreen} options={{
                icon: ({color, size}) => (<MaterialIcons name="settings" size={size} color={color}/>)
            }}/>
        </SideTabNavigator.Navigator>
    );
};

export default SideTabNavigation;
