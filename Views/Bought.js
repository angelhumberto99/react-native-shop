import React, { Component } from 'react';
import { Text, View, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { ProductCardStyles } from '../Styles/ProductCardStyles';
import { MyProductsStyles as styles } from '../Styles/MyProductsStyles';
import { moneyFormatter } from '../moneyFormatter';
import NetInfo from "@react-native-community/netinfo";

class Bought extends Component {
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
        // llamada a la base de datos
        fetch(`https://angelgutierrezweb.000webhostapp.com/getProdsById.php?email=${this.props.email}&on_sale=0`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((res) => {
            this.setState({data: res});
        })
    }

    refresh = () => {
        this.setState({refreshing: true});
        this.getData();
        this.setState({refreshing: false});
    }

    openView = (item) => {
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                fetch(`https://angelgutierrezweb.000webhostapp.com/get_imgs.php?img_id=${item.img_id}`)
                .then((res => res.json()))
                .catch((e) => console.log(e))
                .then((res) => {
                    console.log(res)
                    this.props.navigation.navigate("ProductView", {
                        product: item,
                        imgs: res,
                        showData: false,
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
                                        <View style={{width: 25, height: 25}}/>
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

export default Bought;