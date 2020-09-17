import React, {FC} from "react";
import {Dimensions, ScrollView, View} from "react-native";
import {useSelector} from "react-redux";

import styles from "../../styles";
import {RootState} from "../../store";
import SongActions from "../../components/helpers/detail/SongActions";
import SongSlider from "../../components/helpers/detail/SongSlider";
import SongController from "../../components/helpers/detail/SongController";
import SongDetail from "../../components/helpers/detail/SongDetail";
import LyricsShower from "../../components/helpers/detail/LyricsShower";
import VideoPlayer from "../../components/helpers/detail/VideoPlayer";

type Props = {
    route: any;
    navigation: any;
}

const SongScreen: FC<Props> = ({navigation}) => {
    const {currentId: id, isPlaying, playbackInstance, playMode} = useSelector(({audio}: RootState) => audio);
    const song = useSelector(({songs: {songs}}: RootState) => songs).find(song => song.id === id)!;
    const position = Math.round(useSelector(({audio: {currentPosition}}: RootState) => currentPosition) / 1000);

    navigation.setOptions({
        title: song.title
    });

    return (
        <ScrollView>
            <View style={[styles.screen, {
                padding: 30,
                alignItems: 'center',
                minHeight: Dimensions.get('window').height
            }]}>
                <SongDetail song={song} showImage={!song.videoUri}/>
                {song.videoUri &&
                <VideoPlayer song={song} position={position}/>
                }
                <LyricsShower lyrics={song.lyrics} position={position}/>
                <SongActions song={song} navigation={navigation}/>
                {!song.videoUri &&
                <>
                    <SongSlider position={position} song={song} playbackInstance={playbackInstance}/>
                    < SongController isPlaying={isPlaying} playMode={playMode}/>
                </>
                }
            </View>
        </ScrollView>
    );
};

export default SongScreen;
