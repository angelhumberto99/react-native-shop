import { StyleSheet } from 'react-native';

export const ProductCardStyles = StyleSheet.create({
    productContainer: {
        flex: 1,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#d1e3ed',
        overflow: 'hidden',
        margin: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastItem: {
        flex: 1,
        margin: 3,
        borderRadius: 5,
    },
    listContainer: {
        width: "100%",
        height: "100%",
        padding: 3,
    },
    image: {
        width: 350,
        height: 150,
        resizeMode: 'center',
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
    btn: {
        height: 20,
        width: "60%",
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#3aa4de',
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
    },
    btnElements: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        width: "100%",
        alignItems: 'center',
    },
    endPurchase: {
        width: '70%',
        height: 35,
        backgroundColor: '#80bfa1',
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        elevation: 3,
    },
    cartItem: {
        width: "100%",
        backgroundColor: '#d1e3ed',
        borderRadius: 5,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        marginTop: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        elevation: 3,
    },
    cartImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    cartContainer: {
        width: "100%",
        height: "100%",
        padding: 5,
    },
    btnContainer: {
        paddingBottom: 20,
        width: "100%",
        alignItems: 'center',
    },
    purchaseTxt: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: "#424b54",
    }
})