import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#33383D'
    },
    text: {
        color: '#D3D4D6',
        fontFamily: 'consolas'
    },
    sideBar: {
        flex: 5,
        backgroundColor: '#262A2F',
        justifyContent: 'space-around',
        height: Dimensions.get('window').height,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    input: {
        backgroundColor: '#5C80BC22',
        color: '#D3D4D6',
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginHorizontal: 10,
        width: Dimensions.get('window').width - Dimensions.get('window').width * 5 / 21 - 20 - 50
    },
    inputFocused: {
        backgroundColor: '#5C80BC44'
    }
});

export default styles;
