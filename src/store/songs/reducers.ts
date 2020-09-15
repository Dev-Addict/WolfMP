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
            SettingsST.getInstance().setSongs(action.payload);
            return {
                songs: action.payload
            };
        case UPDATE_SONG:
            const songIndex = state.songs.findIndex(({id}) => id === action.payload.id);
            state.songs[songIndex] = action.payload;
            SettingsST.getInstance().setSongs(state.songs);
            return {
                songs: [...state.songs]
            };
        default:
            return state;
    }
};
