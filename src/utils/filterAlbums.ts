import Album from "../models/Album";

const filterAlbums = (songs: Album[], searchValue: string): Album[] => {
    return songs.filter(({name}) => name.toLowerCase().includes(searchValue));
};

export default filterAlbums;
