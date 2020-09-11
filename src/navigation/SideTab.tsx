import React from "react";
import {MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

import createSideTabBar from "./navigators/createSideTabBar";
import SongsScreen from "../screens/SongsScreen";
import AlbumsScreen from "../screens/AlbumsScreen";
import ArtistsScreen from "../screens/ArtistsScreen";
import GenresScreen from "../screens/GenresScreen";
import PlaylistsScreen from "../screens/PlaylistsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const SideTabNavigator = createSideTabBar();

const SideTab = () => {
    return (
        <SideTabNavigator.Navigator initialRouteName="Songs">
            <SideTabNavigator.Screen name="Songs" component={SongsScreen} options={{
                icon: ({color, size}) => (<MaterialIcons name="library-music" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Albums" component={AlbumsScreen} options={{
                icon: ({color, size}) => (<Ionicons name="ios-albums" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Artists" component={ArtistsScreen} options={{
                icon: ({color, size}) => (<MaterialCommunityIcons name="artist" size={size} color={color}/>)
            }}/>
            <SideTabNavigator.Screen name="Genres" component={GenresScreen} options={{
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

export default SideTab;
