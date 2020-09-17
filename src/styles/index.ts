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
        paddingHorizontal: 15,
        borderRadius: 5,
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
    },
    playControl: {
        backgroundColor: '#2D3136',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    action: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    songActionTouchable: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#D3D4D6',
        margin: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default styles;
