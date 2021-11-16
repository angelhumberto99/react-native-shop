import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ProductCardStyles as styles } from '../Styles/ProductCardStyles';
import Icon from 'react-native-vector-icons/Entypo';
import { moneyFormatter } from '../moneyFormatter';

class CartItem extends Component {
    render() {
        return (
            <View style={styles.cartItem}>
                <Image source={{uri: this.props.product.img_id}} style={styles.cartImage}/>
                <View>
                    <Text style={styles.title}>{this.props.product.name}</Text>
                    <Text style={styles.price}>$ {moneyFormatter(parseFloat(this.props.product.price))}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.handleDelete(this.props.index)}>
                    <Icon name="circle-with-cross" color="#ed2143" size={20}/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CartItem;