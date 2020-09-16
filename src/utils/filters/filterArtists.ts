import Artist from "../../models/Artist";

const filterArtists = (artists: Artist[], searchValue: string): Artist[] => {
    return artists.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));
};

export default filterArtists;
