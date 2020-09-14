import Genre from "../../models/Genre";

const filterGenres = (songs: Genre[], searchValue: string): Genre[] => {
    return songs.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));
};

export default filterGenres;
