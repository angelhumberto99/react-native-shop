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
    title: {
        fontStyle: 'italic',
        fontSize: 18,
        marginBottom: 5,
    },
    infoContainer: {
        marginTop: '15%',
    },
    txt: {
        paddingLeft: 15,
    },
    changePass: {
        marginTop: 20,
        backgroundColor: '#80bfa1',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 15,
    },
    btnTitle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
});