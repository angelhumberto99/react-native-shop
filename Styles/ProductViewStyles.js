import { StyleSheet } from 'react-native';

export const ProductViewStyles = StyleSheet.create({
    background: {
        backgroundColor: '#ced7d9',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#e4eaeb',
        height: '80%',
        width: '85%',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
    },
    btnAdd: {
        padding: 5,
        backgroundColor: '#80bfa1',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    btnTxt: {
        color: '#424b54',
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    backBtn: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 5,
        left: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        fontStyle: 'italic',
        color: '#93a8ac',
    },
    header: {
        height: 45,
        width: '100%',
        backgroundColor: "#424b54",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 15,
    }, 
    imgContainer: {
        width: 150,
        height: 150,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
    },
    prodText: {
        textAlign: 'justify',
        margin: 5,
    }
});