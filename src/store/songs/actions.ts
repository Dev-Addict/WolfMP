import {SET_SONGS, Song, SongsActionTypes} from "./types";


export const setSongs = (songs: Song[]): SongsActionTypes => {
    return {
        type: SET_SONGS,
        payload: songs
    };
};
