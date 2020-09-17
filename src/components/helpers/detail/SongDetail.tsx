import React, {FC} from "react";
import {Dimensions, Image, View} from "react-native";
import Text from "../../Text";
import {Song} from "../../../store/songs/types";

type Props = {
    song: Song;
    showImage?: boolean;
};

const SongDetail: FC<Props> = ({song, showImage = true}) => {
    return (
        <>
            <View style={{alignItems: 'center', marginBottom: 50}}>
                <Text size={4} numberOfLines={1}>Album: {song.album || 'unknown'}</Text>
                <Text size={4} numberOfLines={1}>Artist: {song.artist || 'unknown'}</Text>
                <Text size={4} numberOfLines={1}>Genre: {song.genre || 'unknown'}</Text>
            </View>
            {showImage &&
            <View style={{backgroundColor: '#D3D4D6', borderRadius: 10, borderWidth: 2, borderColor: '#D3D4D6'}}>
                <Image source={{
                    uri: song.coverUri
                }} style={{
                    width: Dimensions.get('window').width - 60,
                    height: Dimensions.get('window').width - 60,
                    borderRadius: 10
                }}/>
            </View>
            }
        </>
    );
};

export default SongDetail;
