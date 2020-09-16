import {SET_SONGS, SongsActionTypes, SongsState, UPDATE_SONG} from './types';
import SettingsST from "../../models/SettingsST";

const initialState: SongsState = {
    songs: []
};

export const songsReducer = (
    state = initialState,
    action: SongsActionTypes
): SongsState => {
    switch (action.type) {
        case SET_SONGS:
            action.payload.sort((s1, s2) =>
                s1.title.toLowerCase().localeCompare(s2.title.toLowerCase()));
            SettingsST.getInstance().setSongs(action.payload);
            return {
                songs: action.payload
            };
        case UPDATE_SONG:
            const songIndex = state.songs.findIndex(({id}) => id === action.payload.id);
            state.songs[songIndex] = action.payload;
            state.songs.sort((s1, s2) =>
                s1.title.toLowerCase().localeCompare(s2.title.toLowerCase()));
            SettingsST.getInstance().setSongs(state.songs);
            return {
                songs: [...state.songs]
            };
        default:
            return state;
    }
};
