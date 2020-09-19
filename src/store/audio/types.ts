import {Audio} from "expo-av";

import PlayMode from "../../models/PlayMode";
import PlayScope from "../../models/PlayScope";

export interface AudioState {
    isPlaying: boolean;
    playbackInstance: Audio.Sound | null;
    currentId: string;
    volume: number;
    isBuffering: boolean;
    playMode: PlayMode;
    playScope: PlayScope;
    scopeValue: string | undefined;
    currentPosition: number;
    isFav: boolean | undefined;
}

export const SET_PLAYING = 'SET_PLAYING';
export const SET_PLAYBACK_INSTANCE = 'SET_PLAYBACK_INSTANCE';
export const SET_CURRENT_ID = 'SET_CURRENT_ID';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_BUFFERING = 'SET_BUFFERING';
export const SET_PLAY_MODE = 'SET_PLAY_MODE';
export const SET_PLAY_SCOPE = 'SET_PLAY_SCOPE';
export const SET_SCOPE_VALUE = 'SET_SCOPE_VALUE';
export const SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';
export const SET_FAV = 'SET_FAV';

interface setPlaying {
    type: typeof SET_PLAYING;
    payload: boolean;
}

interface setPlaybackInstance {
    type: typeof SET_PLAYBACK_INSTANCE;
    payload: any;
}

interface setCurrentId {
    type: typeof SET_CURRENT_ID;
    payload: string;
}

interface setVolume {
    type: typeof SET_VOLUME;
    payload: number;
}

interface setBuffering {
    type: typeof SET_BUFFERING;
    payload: boolean;
}

interface setPlayMode {
    type: typeof SET_PLAY_MODE;
    payload: PlayMode;
}

interface setPlayScope {
    type: typeof SET_PLAY_SCOPE;
    payload: PlayScope;
}

interface setScopeValue {
    type: typeof SET_SCOPE_VALUE;
    payload: string | undefined;
}

interface setCurrentPosition {
    type: typeof SET_CURRENT_POSITION;
    payload: number;
}

interface setFav {
    type: typeof SET_FAV;
    payload: boolean | undefined
}

export type AudioActionTypes =
    setPlaying
    | setPlaybackInstance
    | setCurrentId
    | setVolume
    | setBuffering
    | setPlayMode
    | setPlayScope
    | setScopeValue
    | setCurrentPosition
    | setFav;
