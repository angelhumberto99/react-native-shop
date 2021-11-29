import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
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
            filtered: [],
            refreshing: false,
            purchaised: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.getPurchaisedData()
        try {
            const jsonData = await AsyncStorage.getItem('@cart')
            if (jsonData !== null) {
                var data = JSON.parse(jsonData)
                console.log("data: ",data)
                var unique = {}
                data.forEach((x) => { unique[x.img_id] = (unique[x.img_id] || 0) + 1; });
                console.log("unique: ",unique)
                var filtered = []
                for (const item in unique) {
                    var found = data.find(e => e.img_id === item);
                    found['ammount'] = unique[item];
                    filtered.push(found); 
                } 
                console.log("filtered: ",filtered)
            
                this.setState({products: data, filtered, refreshing: false})
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

    handleDelete = (img_id) => {
        var list = this.state.products.filter((e) => {
            return e.img_id != img_id;
        })

        var filter = this.state.filtered.filter((e) => {
            return e.img_id != img_id;
        })

        this.setState({products: list, filtered: filter}, () => this.storeData());
    }

    getTotal = () => {
        var total = 0
        this.state.products.map((e) => {
            total += parseFloat(e.price)
        })
        var result = moneyFormatter(total)
        return result 
    }

    fetchData = (article) => {
        // URL del servidor
        var url = 'https://angelgutierrezweb.000webhostapp.com/sell_article.php';
        // Datos que se guardarán en la base de datos
        var data = {
            name: article.name,
            stock: article.ammount,
            img_id: article.img_id,
            description: article.description,
            owner: this.props.user,
            on_sale: 0,
            category: article.category,
            price: article.price,
            imgs: article.serverUri,
            email: this.props.email
        };
        // Se hace la petición por el método POST
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json, text/plain, */*'
            }
        }).then(res => res.text()
         ).then(response => {
            if (response === '0') {
                Alert.alert(
                    "Error de conexión",
                    "Ha existido un error al conectar con la base de datos, intente de nuevo",
                    [{text: "OK"}]
                );
            }
                    
        }).catch(error => console.error('Error:', error));
    }

    getPurchaisedData = () => {
        // llamada a la base de datos
        fetch(`https://angelgutierrezweb.000webhostapp.com/getProdsById.php?email=${this.props.email}&on_sale=0`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((res) => {
            this.setState({purchaised: res});
        })
    }

    updateStock = (prod) => {
        fetch(`https://angelgutierrezweb.000webhostapp.com/updateStock.php?stock=${prod.ammount}&img_id=${prod.img_id}`)
        .catch((err) => console.error(err));
    }

    handleFinish = () => {
        this.state.filtered.map((prod) => {
            var found = undefined;
            found = this.state.purchaised.find(e => e.img_id === prod.img_id);
            if (found === undefined) {
                this.fetchData(prod);
            }
            this.updateStock(prod);
        })
        this.setState({products: [], filtered: []}, () => this.storeData());
    }

    endPurchase = () => {
        const total = this.getTotal()
        this.props.navigation.navigate("EndPurchase", {
            total,
            navigation: this.props.navigation,
            handleFinish: this.handleFinish
        })
    }
    
    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Carrito</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <FlatList
                        data={this.state.filtered}
                        style={styles.listContainer}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh} />}
                        renderItem={({item, index}) => {
                            return <CartItem index={index} product={item} handleDelete={this.handleDelete} />
                        }}
                    />
                </View>
                {
                    this.state.products.length === 0 ?
                    <Text style={styles.emptyCart}>No hay productos en el carrito</Text>:
                    <View style={styles.btnContainer}>
                        <Text style={styles.ammount}>Total: $ {this.getTotal()}</Text>
                        <TouchableOpacity onPress={this.endPurchase} style={styles.endPurchase}>
                            <Text style={styles.purchaseTxt}>Finalizar compra</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Cart;