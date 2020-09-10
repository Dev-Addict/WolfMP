import {
    SongsState,
    SongsActionTypes,
    SET_SONGS
} from './types';

const initialState: SongsState = {
    songs: []
};

export const songsReducer = (
    state = initialState,
    action: SongsActionTypes
): SongsState => {
    switch (action.type) {
        case "SET_SONGS":
            return {
                songs: action.payload
            };
        default:
            return state;
    }
};
