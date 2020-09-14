import {Song} from "../../store/songs/types";

const filterSongs = (songs: Song[], searchValue: string): Song[] => {
    return songs.filter(({title}) => title.toLowerCase().includes(searchValue.toLowerCase()));
};

export default filterSongs;
