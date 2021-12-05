import React, { Component } from 'react';
import { Text, View, ScrollView,
         FlatList, RefreshControl, Alert,
         TextInput, TouchableOpacity } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import ProductCard from '../components/ProductCard';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing: false,
            cart: [],
            category: "Todo",
            prodName: "",
            filter: "Mayor a menor precio",
        }
    }

    filters = [
        "Menor a mayor precio",
        "Mayor a menor precio",
    ]

    categories = [
        "Todo",
        "Vehículos",
        "Tecnología",
        "Electrodomésticos",
        "Hogar y muebles",
        "Moda",
        "Deportes",
        "Herramientas",
        "Construcción",
        "Oficina",
        "Juegos y Juguetes",
        "Salud y Equipamiento Médico",
        "Belleza y Cuidado Personal",
        "Inmuebles",
    ]

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
                    this.setState({products: response, category: "Todo", filter: "Mayor a menor precio"})
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

    editStock = (product) => {
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                fetch(`https://angelgutierrezweb.000webhostapp.com/updateStock.php?stock=1&img_id=${product.img_id}&add=1`)
                .catch((err) => console.error(err));
            } else {
                Alert.alert(
                    "Fallo de conexión",
                    "Verifique que su dispositivo cuente con una conexión a internet estable",
                    [{text: "OK"}]
                ); 
            }
        });
    }

    cartHandler = (product) => {
        showMessage({
            message: "Su producto lo espera en el carrito",
            type: "success",
        });
        var prods = this.state.products.map((e) => {
            if (e.img_id === product.img_id) {
                e.stock = (e.stock) - 1;
                this.editStock(product)
            }
            return e;
        });
        this.setState({products: prods});
        
        this.checkData(product)
    }

    refresh = () => {
        this.setState({refreshing: true});
        this.getProducts();
        this.setState({refreshing: false,
                       category: this.categories[0],
                       filter: this.filters[1], 
                       prodName: ""});
    }

    filterData = () => {
        var filter = this.state.filter === this.filters[0]? 0:1;

        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                fetch(`https://angelgutierrezweb.000webhostapp.com/get_filterData.php?filter=${filter}&category=${this.state.category}`)
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    this.setState({products: response})
                })
            } else {
                Alert.alert(
                    "Fallo de conexión",
                    "Verifique que su dispositivo cuente con una conexión a internet estable",
                    [{text: "OK"}]
                ); 
            }
        });

        this.setState({prodName: ""})
    }

    searchData = () => {
        if (this.state.prodName === "") {
            this.getProducts();
        } else {
            // Se revisa la conexión para realizar la llamada al servidor
            NetInfo.fetch("wifi").then(state => {
                if (state.isConnected) {
                    fetch(`https://angelgutierrezweb.000webhostapp.com/searchProduct.php?name=${this.state.prodName}`)
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        this.setState({products: response, category: this.categories[0], filter: this.filters[1]})
                    })
                } else {
                    Alert.alert(
                        "Fallo de conexión",
                        "Verifique que su dispositivo cuente con una conexión a internet estable",
                        [{text: "OK"}]
                    ); 
                }
            });
        }
    }

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Tienda</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 5,}}> 
                        <TextInput onChangeText={(prodName) => this.setState({prodName})} 
                                style={styles.textInput} value={this.state.prodName}
                                placeholder="Buscar"
                                />
                        <TouchableOpacity onPress={this.searchData}>
                            <Icon name="search-circle" size={40} color="#424b54" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={this.state.category}
                                onValueChange={(category) => {
                                    this.setState({category}, () => this.filterData())
                                }}
                                style={styles.picker}
                        >
                            { 
                                this.categories.map((e, i) => {
                                    return <Picker.Item label={e} value={e} key={i}/>
                                }) 
                            }
                        </Picker>
                        <Picker selectedValue={this.state.filter}
                                onValueChange={(filter) => {
                                    this.setState({filter}, () => this.filterData())
                                }}
                                style={styles.picker}
                        >
                            { 
                                this.filters.map((e, i) => {
                                    return <Picker.Item label={e} value={e} key={i}/>
                                }) 
                            }
                        </Picker>
                    </View>
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
                    {
                        this.state.products.length === 0 &&
                        <Text style={styles.emptyCart}>No hay productos disponibles por el momento</Text>
                    }
                </View>
                <FlashMessage position={{top: 50}}/>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Store;
