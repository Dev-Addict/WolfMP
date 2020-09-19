import {Audio} from "expo-av";
import {
    AudioActionTypes,
    SET_BUFFERING,
    SET_CURRENT_ID,
    SET_CURRENT_POSITION,
    SET_FAV,
    SET_PLAY_MODE,
    SET_PLAY_SCOPE,
    SET_PLAYBACK_INSTANCE,
    SET_PLAYING,
    SET_SCOPE_VALUE,
    SET_VOLUME
} from "./types";
import PlayMode from "../../models/PlayMode";
import PlayScope from "../../models/PlayScope";

export const setPlaying = (isPlaying: boolean): AudioActionTypes => ({
    type: SET_PLAYING,
    payload: isPlaying
});

export const setPlaybackInstance = (playbackInstance: Audio.Sound): AudioActionTypes => ({
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

export const setPlayMode = (playMode: PlayMode): AudioActionTypes => ({
    type: SET_PLAY_MODE,
    payload: playMode
});

export const setPlayScope = (playScope: PlayScope): AudioActionTypes => ({
    type: SET_PLAY_SCOPE,
    payload: playScope
});

export const setScopeValue = (scopeValue: string | undefined): AudioActionTypes => ({
    type: SET_SCOPE_VALUE,
    payload: scopeValue
});

export const setCurrentPosition = (currentPosition: number): AudioActionTypes => ({
    type: SET_CURRENT_POSITION,
    payload: currentPosition
});

export const setFav = (isFav: boolean | undefined): AudioActionTypes => ({
    type: SET_FAV,
    payload: isFav
});
