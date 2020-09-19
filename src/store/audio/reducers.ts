import {
    AudioActionTypes,
    AudioState,
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
import SettingsST from "../../models/SettingsST";

const initialState: AudioState = {
    isPlaying: false,
    playbackInstance: null,
    currentId: '',
    volume: 1.0,
    isBuffering: true,
    playMode: PlayMode.REPEAT,
    playScope: PlayScope.NONE,
    scopeValue: undefined,
    currentPosition: 0,
    isFav: undefined
};

export const audioReducer = (
    state = initialState,
    action: AudioActionTypes
): AudioState => {
    switch (action.type) {
        case SET_CURRENT_POSITION:
            return {...state, currentPosition: action.payload};
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
        case SET_PLAY_MODE:
            SettingsST.getInstance().setPlayOrder(action.payload);
            return {...state, playMode: action.payload};
        case SET_PLAY_SCOPE:
            SettingsST.getInstance().setPlayScope(action.payload);
            return {...state, playScope: action.payload};
        case SET_SCOPE_VALUE:
            SettingsST.getInstance().setScopeValue(action.payload);
            return {...state, scopeValue: action.payload};
        case SET_FAV:
            SettingsST.getInstance().setFav(action.payload);
            return {...state, isFav: action.payload};
        default:
            return state;
    }
};
