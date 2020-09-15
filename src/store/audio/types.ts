import {Audio} from "expo-av";
import PlayMode from "../../models/PlayMode";

export interface AudioState {
    isPlaying: boolean;
    playbackInstance: Audio.Sound | null;
    currentId: string;
    volume: number;
    isBuffering: boolean;
    playMode: PlayMode
}

export const SET_PLAYING = 'SET_PLAYING';
export const SET_PLAYBACK_INSTANCE = 'SET_PLAYBACK_INSTANCE';
export const SET_CURRENT_ID = 'SET_CURRENT_ID';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_BUFFERING = 'SET_BUFFERING';
export const SET_PLAY_MODE = 'SET_PLAY_MODE';

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

export type AudioActionTypes = setPlaying | setPlaybackInstance | setCurrentId | setVolume | setBuffering | setPlayMode;
