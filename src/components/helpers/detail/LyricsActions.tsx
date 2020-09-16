import React, {FC} from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import Text from "../../Text";
import styles from "../../../styles";

type Props = {
    onLrc: () => void;
    onAddLine: () => void;
    onSave: () => void;
    onCancel: () => void;
};

const LyricsActions: FC<Props> = ({onLrc, onAddLine, onSave, onCancel}) => {
    return (
        <>
            <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 60, marginTop: 50}}>
                <TouchableOpacity style={styles.action} onPress={onLrc}>
                    <MaterialIcons name="insert-drive-file" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Use Lrc</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={onAddLine}>
                    <MaterialIcons name="add-circle" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Add Line</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={onSave}>
                    <MaterialIcons name="save" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Save File</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={onCancel}>
                    <MaterialIcons name="cancel" size={24} color="#D3D4D6"/>
                    <Text size={6} numberOfLines={1}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default LyricsActions;
