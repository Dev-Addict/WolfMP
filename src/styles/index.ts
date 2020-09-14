import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#33383D'
    },
    screen: {
        flex: 1,
        height: '100%',
        backgroundColor: '#33383D'
    },
    text: {
        color: '#D3D4D6',
        fontFamily: 'consolas'
    },
    sideBar: {
        flex: 3,
        backgroundColor: '#262A2F',
        justifyContent: 'space-around',
        height: Dimensions.get('window').height,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    input: {
        backgroundColor: '#D3D4D622',
        color: '#D3D4D6',
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        width: Dimensions.get('window').width - Dimensions.get('window').width * 3 / 21 - 20 - 50
    },
    inputFocused: {
        backgroundColor: '#D3D4D644'
    },
    songItem: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingBottom: 5,
        marginVertical: 5,
        borderBottomColor: '#D3D4D6',
        borderBottomWidth: 2,
        overflow: 'hidden'
    },
    icon: {
        marginHorizontal: 10
    },
    centerContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33383D'
    },
    card: {
        borderWidth: 2,
        borderColor: '#D3D4D6',
        borderRadius: 5,
        backgroundColor: '#262A2F',
        elevation: 3,
        margin: 10
    },
    content: {
        padding: 10
    }
});

export default styles;
