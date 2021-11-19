import { StyleSheet } from 'react-native';

export const MyProductsStyles = StyleSheet.create({
    productWrapper: {
        backgroundColor: '#f4fffd',
        marginTop: 2,
        marginBottom: 2,
        padding: 5,
        borderRadius: 5,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: 'center',
    }, 
    price: {
        textAlign: 'center',
        fontSize: 13,
    },
    empty: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        textAlign: 'center',
    },
});