import {SET_SONGS, Song, SongsActionTypes} from "./types";

export const setSongs = (songs: Song[]): SongsActionTypes => ({
    type: SET_SONGS,
    payload: songs
});
