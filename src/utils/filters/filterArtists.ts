import Artist from "../../models/Artist";

const filterArtists = (songs: Artist[], searchValue: string): Artist[] => {
    return songs.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));
};

export default filterArtists;
