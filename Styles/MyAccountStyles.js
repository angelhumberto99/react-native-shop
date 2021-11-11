import { StyleSheet } from 'react-native';

export const MyAccountStyles = StyleSheet.create({
    logOutBtn: {
        width: 43,
        height: 43,
        backgroundColor: '#d11f3d',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
    },
    logOutContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: '15%',
    },
    logOutText: {
        marginTop: 5,
        fontStyle: 'italic',
    },
});