import React, {FC} from 'react';
import {Text as NativeText, TextProps} from "react-native";
import styles from "../styles";

type Props = TextProps & {
    size?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

const Text: FC<Props> = ({size = 5, style, ...props}) => (
    <NativeText style={[styles.text, {fontSize: 24 - size * 2}, style]} {...props}/>
);

export default Text;
