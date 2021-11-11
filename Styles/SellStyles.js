import { StyleSheet } from 'react-native';

export const SellStyles = StyleSheet.create({
    scrollContainer: {
        width: "100%",
        height: "90%",
    },
    scrollBody: {
        alignItems: "center",
    },
    image: {
        width: 200, 
        height: 200,
        borderRadius: 15,
    },
    add: {
        marginTop: 10,
        marginBottom: 10,
        width: 43,
        height: 43,
        backgroundColor: '#3aa4de',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
    },
    del: {
        width: 25,
        height: 25,
        backgroundColor: 'red',
        borderRadius: 25,
        paddingTop: 2,
        paddingLeft: 1,
        alignItems: 'center',
        position: 'absolute',
        top: 5,
        left: 170,
    },
    addImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderRadius: 15,
        borderStyle: 'dashed',
        borderColor: 'gray',
        borderWidth: 2,
    },
})