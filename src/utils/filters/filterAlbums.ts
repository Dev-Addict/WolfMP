import Album from "../../models/Album";

const filterAlbums = (albums: Album[], searchValue: string): Album[] => {
    return albums.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));
};

export default filterAlbums;
