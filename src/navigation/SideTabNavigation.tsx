import React, {FC} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';

import createSideTabBar from "./navigators/createSideTabBar";
import SongsScreen from "../screens/Main/SongsScreen";
import AlbumsScreen from "../screens/Main/AlbumsScreen";
import ArtistsScreen from "../screens/Main/ArtistsScreen";
import GenresScreen from "../screens/Main/GenresScreen";

type StackProps = {
    isFav?: boolean;
};

const AlbumsStack = createStackNavigator();

const Albums: FC<StackProps> = ({isFav}) => {
    return (
        <AlbumsStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <AlbumsStack.Screen name="Albums" component={AlbumsScreen} initialParams={{isFav}}/>
            <AlbumsStack.Screen name="Songs" component={SongsScreen} initialParams={{isFav}}/>
        </AlbumsStack.Navigator>
    );
};

const ArtistsStack = createStackNavigator();

const Artists: FC<StackProps> = ({isFav}) => {
    return (
        <ArtistsStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <ArtistsStack.Screen name="Artists" component={ArtistsScreen} initialParams={{isFav}}/>
            <ArtistsStack.Screen name="Songs" component={SongsScreen} initialParams={{isFav}}/>
        </ArtistsStack.Navigator>
    );
};

const GenresStack = createStackNavigator();

const Genres: FC<StackProps> = ({isFav}) => {
    return (
        <GenresStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <GenresStack.Screen name="Genres" component={GenresScreen} initialParams={{isFav}}/>
            <GenresStack.Screen name="Songs" component={SongsScreen} initialParams={{isFav}}/>
        </GenresStack.Navigator>
    );
};

const FavoritesNavigator = createSideTabBar();

const FavAlbums = () => <Albums isFav={true}/>;
const FavArtists = () => <Artists isFav={true}/>;
const FavGenres = ()=> <Genres isFav={true}/>;

const FavoritesNavigation = () => {
    return (
        <FavoritesNavigator.Navigator initialRouteName="Songs" isFav={true}>
            <FavoritesNavigator.Screen name="Songs" component={SongsScreen} options={{
                icon: ({color, size}) => (<MaterialIcons name="library-music" size={size} color={color}/>)
            }} initialParams={{
                isFav: true
            }}/>
            <FavoritesNavigator.Screen name="Albums" component={FavAlbums} options={{
                icon: ({color, size}) => (<Ionicons name="ios-albums" size={size} color={color}/>)
            }}/>
            <FavoritesNavigator.Screen name="Artists" component={FavArtists} options={{
                icon: ({color, size}) => (<MaterialCommunityIcons name="artist" size={size} color={color}/>)
            }}/>
            <FavoritesNavigator.Screen name="Genres" component={FavGenres} options={{
                icon: ({color, size}) => (<FontAwesome5 name="compact-disc" size={size} color={color}/>)
            }}/>
        </FavoritesNavigator.Navigator>
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
            <SideTabNavigator.Screen name="Favorites" component={FavoritesNavigation} options={{
                icon: ({color, size}) => (<MaterialIcons name="favorite" size={size} color={color}/>)
            }}/>
        </SideTabNavigator.Navigator>
    );
};

export default SideTabNavigation;
