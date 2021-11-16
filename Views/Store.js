import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, RefreshControl } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import ProductCard from '../components/ProductCard';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        fetch("https://angelgutierrezweb.000webhostapp.com/get_articles.php")
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            this.setState({products: response})
        });
    }

    storeData = async () => {
        try {
            var jsonData = JSON.stringify(this.state.cart);
            console.log(jsonData)
            await AsyncStorage.setItem('@cart', jsonData);
        } catch (e) {
            console.log(e)
        }
    }
    
    cartHandler = (product) => {
        this.setState({cart: [...this.state.cart, ...[product]]}, () => this.storeData())
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
                                return <ProductCard product={item} cartHandler={this.cartHandler}/>
                            }
                        }}
                        numColumns={2}
                    />
                </View>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Store;
