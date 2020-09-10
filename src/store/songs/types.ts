export interface Song {
    id: string
    dbId: string
    title: string
    album?: string
    artist?: string
    genre?: string
    isExcluded: boolean
    isFav: boolean
    lrcUri?: string
    coverUri?: string
    uri: string
    duration: number
}

export interface SongsState {
    songs: Song[]
}

export const SET_SONGS = 'SET_SONGS';

interface SetSongs {
    type: typeof SET_SONGS
    payload: Song[]
}

export type SongsActionTypes = SetSongs;
