import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { moneyFormatter } from '../moneyFormatter';

class ProductCard extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.productContainer}>
                <View style={styles.card}>
                    <Image source={{uri: this.props.product.img_id}} style={styles.image}/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{this.props.product.name}</Text>
                        <Text style={styles.price}>$ {moneyFormatter(parseFloat(this.props.product.price))}</Text>
                        <TouchableOpacity onPress={() => this.props.cartHandler(this.props.product)} style={styles.btn}>
                            <View style={styles.btnElements}>
                                <Icon name={"cart"} size={15}/>
                                <Text> Añadir</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ProductCard;