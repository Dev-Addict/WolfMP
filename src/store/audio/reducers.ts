import {
    AudioActionTypes,
    AudioState,
    SET_BUFFERING,
    SET_CURRENT_ID,
    SET_PLAYBACK_INSTANCE,
    SET_PLAYING,
    SET_VOLUME
} from "./types";

const initialState: AudioState = {
    isPlaying: false,
    playbackInstance: null,
    currentId: '',
    volume: 1.0,
    isBuffering: true
};

export const audioReducer = (
    state = initialState,
    action: AudioActionTypes
): AudioState => {
    switch (action.type) {
        case SET_PLAYING:
            return {...state, isPlaying: action.payload};
        case SET_PLAYBACK_INSTANCE:
            return {...state, playbackInstance: action.payload};
        case SET_CURRENT_ID:
            return {...state, currentId: action.payload};
        case SET_VOLUME:
            return {...state, volume: action.payload};
        case SET_BUFFERING:
            return {...state, isBuffering: action.payload};
        default:
            return state;
    }
};
