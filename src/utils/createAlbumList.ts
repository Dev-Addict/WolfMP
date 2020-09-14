import Album from "../models/Album";
import {Song} from "../store/songs/types";

const createAlbumList = (albumNameList: (string | undefined)[], songs: Song[]): Album[] => {
    return albumNameList.map((albumName): Album => ({
        name: albumName || 'unknown',
        songAmount: songs.filter(song => song.album?.startsWith(albumName!)).length,
        subAlbums: Array.from(new Set(songs.filter(song => song.album?.startsWith(albumName + '/')
            && !song.album?.substr(albumName!.length + 1).includes('/'))
            .map(song => song.album))).length,
        artists: Array.from(new Set(
            songs.filter(song => song.album?.startsWith(albumName!)).map(song => song.artist || 'unknown')))
    })).sort((a1, a2) => a1.name.toLowerCase().localeCompare(a2.name.toLowerCase()));
};

export default createAlbumList;
