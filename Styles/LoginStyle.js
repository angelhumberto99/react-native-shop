import { StyleSheet } from 'react-native';

export const LoginStyle = StyleSheet.create({
    header: {
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#424b54',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
        color: 'gray',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#ced7d9',
    },
    card: {
        height: '75%',
        width: '85%',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#e4eaeb',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation:5,
    },
    textInput: {
        width: '75%',
        fontSize: 17,
        color: '#424b54',
        borderBottomColor: '#93a8ac',
        borderBottomWidth: 1,
    },
    btnContainer: {
        marginTop: 20,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: '75%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    signIn: {
        backgroundColor: '#93a8ac',
        marginRight: 5,
    },
    signUp: {
        backgroundColor: '#80bfa1',
        marginLeft: 5,
    },
    btnText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 16,
    },
    passContainer: {
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});