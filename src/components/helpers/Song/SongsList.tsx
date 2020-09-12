import React, {FC} from "react";
import {Dimensions, FlatList} from "react-native";
import {useSelector} from "react-redux";

import {RootState} from "../../../store";
import {Song} from "../../../store/songs/types";
import SongItem from "./SongItem";

type Props = {
    navigation: any
}

const SongsList: FC<Props> = ({navigation}) => {
    const songs = useSelector(({songs: {songs}}: RootState) => songs);

    return (
        <FlatList data={songs} renderItem={props => <SongItem navigation={navigation} {...props}/>}
                  keyExtractor={({id}: Song) => id} removeClippedSubviews maxToRenderPerBatch={20}
                  updateCellsBatchingPeriod={200} style={{height: Dimensions.get('window').height - 50}}
                  initialNumToRender={20} windowSize={41} getItemLayout={((data, index) => ({
            index,
            length: 41.568626403808594,
            offset: index * 41.568626403808594
        }))}/>
    );
};

export default SongsList;
