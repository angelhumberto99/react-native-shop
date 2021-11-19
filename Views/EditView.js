import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { ProductViewStyles as styles } from '../Styles/ProductViewStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { moneyFormatter } from '../moneyFormatter';
import { LoginStyle as InputStyles } from '../Styles/LoginStyle';

const screenWidth = Dimensions.get('window').width * 0.85;

class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            photos: [],
            activeIndex: 0,
            category: "Vehículos",
            title: "",
            price: "",
            description: "",
            stock: "",
            serverUri: [],
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
        const { product, imgs } = this.props.route.params;
        return (
            <View style={styles.background}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}> 
                            <Icon name="arrow-back-circle" size={35} color="#93a8ac"/>
                        </TouchableOpacity>
                        <Text style={[styles.title, {fontSize: 20}]}>Editar</Text>
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
                        <View style={{alignItems: 'center', marginTop: 15, marginBottom: 25}}>
                            <TextInput onChangeText={(title) => this.setState({title})} 
                            style={InputStyles.textInput} value={this.state.title}
                            placeholder={product.name}
                            />
                            <TextInput onChangeText={(price) => { if (!price.match(/[ |-]+/)) this.setState({price}) }} 
                            style={InputStyles.textInput} value={this.state.price}
                            placeholder={"$ "+ moneyFormatter(parseFloat(product.price))}
                            keyboardType="numeric"
                            />
                            <TextInput onChangeText={(description) => this.setState({description})} 
                            style={InputStyles.textInput} value={this.state.description}
                            multiline={true}
                            placeholder={product.description}
                            />
                            <TextInput onChangeText={(stock) => { if (!stock.match(/[ |-]+/)) this.setState({stock}) }} 
                            style={InputStyles.textInput} value={this.state.stock}
                            placeholder={"stock: "+product.stock}
                            keyboardType="numeric"
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={{width: "75%"}} onPress={() => {
                            this.props.navigation.goBack();
                        }}> 
                            <View style={styles.btnAdd}>
                                <Icon name="save-outline" size={20} color="#424b54"/>
                                <Text style={styles.btnTxt}> Guardar cambios</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default EditView;
