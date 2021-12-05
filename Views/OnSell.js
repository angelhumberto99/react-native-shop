import React, { Component } from 'react';
import { Text, View, FlatList,
         RefreshControl, TouchableOpacity, Image,
         Alert } from 'react-native';
import { ProductCardStyles } from '../Styles/ProductCardStyles';
import { MyProductsStyles as styles } from '../Styles/MyProductsStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { moneyFormatter } from '../moneyFormatter';
import NetInfo from "@react-native-community/netinfo";

class OnSell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) { 
                // llamada a la base de datos
                fetch(`https://angelgutierrezweb.000webhostapp.com/getProdsById.php?email=${this.props.email}&on_sale=1`)
                .then((res) => res.json())
                .catch((err) => console.log(err))
                .then((res) => {
                    this.setState({data: res});
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

    refresh = () => {
        this.setState({refreshing: true});
        this.getData();
        this.setState({refreshing: false});
    }

    deleteFromDB = (product) => {
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) { 
                // eliminar producto de la base de datos
                fetch(`https://angelgutierrezweb.000webhostapp.com/deleteProd.php?id=${product.product_id}`)
                .then((res) => res.json())
                .catch((err) => console.error(err))
                .then((res) => {
                    console.log(res)
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

    deleteItem = (index) => {
        Alert.alert(
            "Eliminar articulo",
            "Está seguro que desea eliminar este articulo",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Aceptar",
                    onPress: () => {
                        // eliminar de memoria el producto
                        var product = {}
                        var list = this.state.data.filter((e, i) => {
                            if (i === index)
                                product = e
                            return i != index
                        })
                        this.setState({data: list}, () => this.deleteFromDB(product));
                    },
                },
            ]
        )
    }

    openView = (item) => {
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                console.log("item.img_id: ", item.img_id)
                fetch(`https://angelgutierrezweb.000webhostapp.com/get_imgs.php?img_id=${item.img_id}`)
                .then((res => res.json()))
                .catch((e) => console.log(e))
                .then((res) => {
                    console.log(res)
                    this.props.navigation.navigate("EditView", {
                        product: item,
                        imgs: res,
                    })
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

    render() {
        return (
            <View>
                <View style={{height: '100%', backgroundColor: '#ced7d9'}}>
                    <FlatList
                        data={this.state.data}
                        style={ProductCardStyles.listContainer}
                        refreshControl={<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refresh} />}
                        renderItem={({item, index}) => {
                            return (
                                <TouchableOpacity onPress={() => this.openView(item)} style={styles.productWrapper}>
                                    <View style={styles.productContainer}>
                                        <Image source={{uri: item.img_id}} style={styles.img}/>
                                        <View>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <Text style={styles.price}>$ {moneyFormatter(parseFloat(item.price))}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.deleteItem(index)}>
                                            <Icon name='close-circle' size={25} color="#ed2143"/>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    {
                        this.state.data.length === 0 &&
                        <Text style={styles.empty}>No hay productos a la venta</Text>
                    }
                </View>
            </View>
        )
    }
}

export default OnSell;