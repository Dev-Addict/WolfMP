import Lyrics from "../../models/Lyrics";

export interface Song {
    id: string;
    dbId: string;
    title: string;
    album?: string;
    artist?: string;
    genre?: string;
    isExcluded: boolean;
    isFav: boolean;
    lrcUri?: string;
    coverUri?: string;
    videoUri?: string;
    uri: string;
    duration: number;
    lyrics?: Lyrics;
}

export interface SongsState {
    songs: Song[];
}

export const SET_SONGS = 'SET_SONGS';
export const UPDATE_SONG = 'UPDATE_SONG';

interface setSongs {
    type: typeof SET_SONGS;
    payload: Song[];
}

interface updateSong {
    type: typeof UPDATE_SONG;
    payload: Song;
}

export type SongsActionTypes = setSongs | updateSong;
