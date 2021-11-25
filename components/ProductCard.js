import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { moneyFormatter } from '../moneyFormatter';
import NetInfo from "@react-native-community/netinfo";

class ProductCard extends Component {
    loadPreview = () => {
        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                fetch(`https://angelgutierrezweb.000webhostapp.com/get_imgs.php?img_id=${this.props.product.img_id}`)
                .then((res => res.json()))
                .catch((e) => console.log(e))
                .then((res) => {
                    console.log(res)
                    this.props.navigation.navigate("ProductView", {
                        product:this.props.product,
                        imgs: res,
                        showData: true,
                        cartHandler: this.props.cartHandler,
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
            <TouchableOpacity onPress={this.loadPreview} style={styles.productContainer}>
                <View style={styles.card}>
                    <Image source={{uri: this.props.product.img_id}} style={styles.image}/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{this.props.product.name}</Text>
                        <Text style={styles.price}>$ {moneyFormatter(parseFloat(this.props.product.price))}</Text>
                        {
                            this.props.product.stock <= 0 ?
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    "Sin Stock",
                                    "El producto no se encuentra disponible de momento",
                                    [{text: "OK"}]
                                )
                                }} style={[styles.btn, {backgroundColor: '#ed2143'}]}>
                                <View style={styles.btnElements}>
                                    <Icon name={"cart-outline"} size={15}/>
                                    <Text> Sin Stock</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.props.cartHandler(this.props.product)} style={styles.btn}>
                                <View style={styles.btnElements}>
                                    <Icon name={"cart-outline"} size={15}/>
                                    <Text> Añadir</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ProductCard;