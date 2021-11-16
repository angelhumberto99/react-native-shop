import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import CartItem from '../components/CartItem';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moneyFormatter } from '../moneyFormatter';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('@cart')
            if (jsonData !== null) {
                const data = JSON.parse(jsonData)
                this.setState({products: data, refreshing: false})
            }
        } catch(e) {
            console.log(e)
        }
    }

    storeData = async () => {
        try {
            var jsonData = JSON.stringify(this.state.products);
            await AsyncStorage.setItem('@cart', jsonData);
            jsonData = JSON.stringify({update: "cart"});
            await AsyncStorage.setItem('@update', jsonData);
        } catch (e) {
            console.log(e)
        }
    }

    refresh = () => {
        this.setState({refreshing: true});
        this.loadData();
    }

    handleDelete = (index) => {
        var list = this.state.products.filter((e, i) => {
            return i != index
        })
        this.setState({products: list}, () => this.storeData());
    }

    getTotal = () => {
        var total = 0
        this.state.products.map((e) => {
            total += parseFloat(e.price)
        })
        var result = moneyFormatter(total)
        return result 
    }
    
    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Carrito</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <FlatList
                        data={[...this.state.products, ...[{name: "last"}]]}
                        style={styles.listContainer}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh} />}
                        renderItem={({item, index}) => {
                            if (this.state.products.length === 0) {
                                return <Text>No hay productos en el carrito</Text>;
                            } else if (item.name === "last") {
                                return (
                                    <View style={styles.btnContainer}>
                                        <Text>Total: $ {this.getTotal()}</Text>
                                        <TouchableOpacity style={styles.endPurchase}>
                                            <Text style={styles.purchaseTxt}>Finalizar compra</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            } else{
                                return <CartItem index={index} product={item} handleDelete={this.handleDelete} />
                            }
                        }}
                    />
                </View>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Cart;