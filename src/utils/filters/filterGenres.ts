import Genre from "../../models/Genre";

const filterGenres = (genres: Genre[], searchValue: string): Genre[] => {
    return genres.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));
};

export default filterGenres;
