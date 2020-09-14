import {Audio} from "expo-av";

export interface AudioState {
    isPlaying: boolean;
    playbackInstance: typeof Audio.Sound | null;
    currentId: string;
    volume: number;
    isBuffering: boolean;
}

export const SET_PLAYING = 'SET_PLAYING';
export const SET_PLAYBACK_INSTANCE = 'SET_PLAYBACK_INSTANCE';
export const SET_CURRENT_ID = 'SET_CURRENT_ID';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_BUFFERING = 'SET_BUFFERING';

interface setPlaying {
    type: typeof SET_PLAYING;
    payload: boolean;
}

interface setPlaybackInstance {
    type: typeof SET_PLAYBACK_INSTANCE;
    payload: typeof Audio.Sound;
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

export type AudioActionTypes = setPlaying | setPlaybackInstance | setCurrentId | setVolume | setBuffering;
