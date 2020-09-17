import React, {FC} from "react";
import {Video} from "expo-av";
import {Dimensions, View,} from "react-native";

type Props = {
    uri: string;
};

const FastVideo: FC<Props> = ({uri}) => {
    return (
        <View style={{
            backgroundColor: '#D3D4D6', borderRadius: 10, borderWidth: 2, borderColor: '#D3D4D6',
            width: Dimensions.get('window').width - 60,
            height: (Dimensions.get('window').width - 60) * 9 / 16
        }}>
            {!!uri &&
            <Video source={{uri}} shouldPlay={true} isMuted={true} resizeMode="cover" focusable={false}
                   isLooping={true} style={{width: '100%', height: '100%', borderRadius: 10}}/>
            }
        </View>
    );
};

export default FastVideo;
