import {
    SongsState,
    SongsActionTypes,
    SET_SONGS
} from './types';
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
        default:
            return state;
    }
};
