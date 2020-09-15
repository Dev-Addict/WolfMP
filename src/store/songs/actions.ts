import {SET_SONGS, Song, SongsActionTypes, UPDATE_SONG} from "./types";

export const setSongs = (songs: Song[]): SongsActionTypes => ({
    type: SET_SONGS,
    payload: songs
});

export const updateSong = (song: Song): SongsActionTypes => ({
    type: UPDATE_SONG,
    payload: song
});
