import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { ProductViewStyles as styles } from '../Styles/ProductViewStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { moneyFormatter } from '../moneyFormatter';

const screenWidth = Dimensions.get('window').width * 0.85;

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        }
    }

    renderItem = ({item, index}) => {
        return (
            <View style={styles.imgContainer}>
                <Image
                    key={index}
                    style={styles.img}
                    source={{uri: item.img}}
                />
            </View>
        );
    }

    render() {
        const { product, imgs, cartHandler } = this.props.route.params;
        return (
            <View style={styles.background}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}> 
                            <Icon name="arrow-back-circle" size={35} color="#93a8ac"/>
                        </TouchableOpacity>
                        <Text style={styles.title}>{product.name}</Text>
                    </View>
                    <ScrollView style={{padding: 10}}>
                        <View style={{alignItems: 'center'}}> 
                            <Carousel
                                layout={'default'} 
                                ref={ref => this.carousel = ref}
                                data={imgs}
                                renderItem={this.renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={150}
                                onSnapToItem = { index => this.setState({activeIndex:index}) }
                            />
                            <Pagination
                                dotsLength={imgs.length}
                                activeDotIndex={this.state.activeIndex}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 8,
                                    backgroundColor: 'gray'
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                        </View>
                        <View style={{alignItems: 'center', marginTop: 15}}>
                            <Text style={styles.prodText}>$ {moneyFormatter(parseFloat(product.price))}</Text>
                            <Text style={styles.prodText}>{product.description}</Text>
                            <Text style={styles.prodText}>Vendedor: {product.owner}</Text>
                        </View>
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={{width: "75%"}} onPress={() => {
                            cartHandler(product);
                            this.props.navigation.goBack();
                        }}> 
                        <View style={styles.btnAdd}>
                            <Icon name="cart-outline" size={25} color="#424b54"/>
                            <Text style={styles.btnTxt}> Añadir</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default ProductView;