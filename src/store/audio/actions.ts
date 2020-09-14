import {Audio} from "expo-av";
import {AudioActionTypes, SET_BUFFERING, SET_CURRENT_ID, SET_PLAYBACK_INSTANCE, SET_PLAYING, SET_VOLUME} from "./types";

export const setPlaying = (isPlaying: boolean): AudioActionTypes => ({
    type: SET_PLAYING,
    payload: isPlaying
});

export const setPlaybackInstance = (playbackInstance: typeof Audio.Sound): AudioActionTypes => ({
    type: SET_PLAYBACK_INSTANCE,
    payload: playbackInstance
});

export const setCurrentId = (currentId: string): AudioActionTypes => ({
    type: SET_CURRENT_ID,
    payload: currentId
});

export const setVolume = (volume: number): AudioActionTypes => ({
    type: SET_VOLUME,
    payload: volume
});

export const setBuffering = (isBuffering: boolean): AudioActionTypes => ({
    type: SET_BUFFERING,
    payload: isBuffering
});
