import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, RefreshControl, Alert } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import ProductCard from '../components/ProductCard';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import FlashMessage, { showMessage } from "react-native-flash-message";

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing: false,
            cart: [],
        }
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {  
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                fetch("https://angelgutierrezweb.000webhostapp.com/get_articles.php")
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    this.setState({products: response})
                });
            } else {
                Alert.alert(
                    "Fallo de conexión",
                    "Verifique que su dispositivo cuente con una conexión a internet estable",
                    [{text: "OK"}]
                ); 
            }
        });
    }

    storeData = async () => {
        try {
            var jsonData = JSON.stringify(this.state.cart);
            await AsyncStorage.setItem('@cart', jsonData);
            jsonData = JSON.stringify({update: "store"});
            await AsyncStorage.setItem('@update', jsonData);
        } catch (e) {
            console.log(e)
        }
    }
    
    loadData = async (product) => {
        try {
            const jsonData = await AsyncStorage.getItem('@cart')
            if (jsonData !== null) {
                const data = JSON.parse(jsonData)
                this.setState({cart: [...data, ...[product]]}, () => this.storeData())
            }
        } catch(e) {
            console.log(e)
        }
    }

    checkData = async (product) => {
        try {
            const jsonData = await AsyncStorage.getItem('@update')
            if (jsonData !== null) {
                const data = JSON.parse(jsonData)
                if (data.update === "cart") {
                    this.loadData(product)
                } else {
                    this.setState({cart: [...this.state.cart, ...[product]]}, () => this.storeData())
                }
            } else {
                this.setState({cart: [...this.state.cart, ...[product]]}, () => this.storeData())
            }
        } catch(e) {
            console.log(e)
        }
    }

    cartHandler = (product) => {
        showMessage({
            message: "Su producto lo espera en el carrito",
            type: "success",
        });
        var prods = this.state.products.map((e) => {
            if (e.img_id === product.img_id) {
                console.log(e.stock)
                e.stock = (e.stock) - 1;
            }
            return e;
        });
        this.setState({products: prods});
        
        this.checkData(product)
    }

    refresh = () => {
        this.setState({refreshing: true});
        this.getProducts();
        this.setState({refreshing: false});
    }

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Tienda</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <FlatList
                        data={[...this.state.products, {name: "last"}]}
                        style={styles.listContainer}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh} />}
                        renderItem={({item, index}) => {
                            if (index === this.state.products.length) {
                                if (index%2 != 0) { 
                                    return <View style={styles.lastItem}></View>
                                }
                            } else{
                                return <ProductCard key={index} product={item} cartHandler={this.cartHandler} navigation={this.props.navigation}/>
                            }
                        }}
                        numColumns={2}
                    />
                </View>
                <FlashMessage position={{top: 50}}/>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Store;
