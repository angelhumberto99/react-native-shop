import { StyleSheet } from 'react-native';

export const MenuStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ced7d9',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#424b54',
        height: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
    },
    headerText: {
        color: 'gray',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 25,
    },
    menu:{
        height: 65,
    },
    scrollContainer: {
        width: "100%",
    },
    scrollBody: {
        paddingTop: 20,
        alignItems: "center",
        paddingBottom: 20,
    },
});