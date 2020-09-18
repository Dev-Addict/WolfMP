import React, {FC, useEffect, useState} from "react";
import {Dimensions, ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import SongSlider from "../../components/helpers/detail/SongSlider";
import SongController from "../../components/helpers/detail/SongController";
import Text from "../../components/Text";
import {RootState} from "../../store";
import styles from "../../styles";
import {thunkUpdateSong} from "../../thunk";

type Props = {
    navigation: any;
};

const EditScreen: FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();

    const {currentId, playbackInstance, isPlaying, playMode} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === currentId)!;
    const position = Math.round(useSelector(({audio: {currentPosition}}: RootState) => currentPosition) / 1000);

    const [title, setTitle] = useState(song.title || '');
    const [album, setAlbum] = useState(song.album || '');
    const [artist, setArtist] = useState(song.artist || '');
    const [genre, setGenre] = useState(song.genre || '');

    const [isTitleFocused, setTitleFocused] = useState(false);
    const [isAlbumFocused, setAlbumFocused] = useState(false);
    const [isArtistFocused, setArtistFocused] = useState(false);
    const [isGenreFocused, setGenreFocused] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            title: song.title
        });
    }, [song]);

    const onSave = () => {
        const newSong = {...song};
        if (title)
            newSong.title = title;
        if (album)
            newSong.album = album;
        if (artist)
            newSong.artist = artist;
        if (genre)
            newSong.genre = genre;

        dispatch(thunkUpdateSong(newSong));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={[styles.screen, {padding: 30, width: '100%', minHeight: Dimensions.get('window').height, alignItems: 'center'}]}>
                <SongSlider position={position} song={song} playbackInstance={playbackInstance}/>
                <SongController isPlaying={isPlaying} playMode={playMode}/>
                <Text style={{marginTop: 50}}>Title</Text>
                <TextInput style={[styles.input, {marginBottom: 30}, isTitleFocused ? styles.inputFocused : {}]}
                           onChangeText={value => setTitle(value)} placeholder="Title" value={title}
                           onFocus={() => setTitleFocused(true)} onBlur={() => setTitleFocused(false)}/>
                <Text>Album</Text>
                <TextInput style={[styles.input, {marginBottom: 30}, isAlbumFocused ? styles.inputFocused : {}]}
                           onChangeText={value => setAlbum(value)} placeholder="Album" value={album}
                           onFocus={() => setAlbumFocused(true)} onBlur={() => setAlbumFocused(false)}/>
                <Text>Artist</Text>
                <TextInput style={[styles.input, {marginBottom: 30}, isArtistFocused ? styles.inputFocused : {}]}
                           onChangeText={value => setArtist(value)} placeholder="Artist" value={artist}
                           onFocus={() => setArtistFocused(true)} onBlur={() => setArtistFocused(false)}/>
                <Text>Genre</Text>
                <TextInput style={[styles.input, {marginBottom: 50}, isGenreFocused ? styles.inputFocused : {}]}
                           onChangeText={value => setGenre(value)} placeholder="Genre" value={genre}
                           onFocus={() => setGenreFocused(true)} onBlur={() => setGenreFocused(false)}/>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default EditScreen;
