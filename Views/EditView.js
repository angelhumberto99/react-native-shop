import React, { Component } from 'react';
import { Text, View, TouchableOpacity,
         Image, ScrollView, Dimensions,
         TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { ProductViewStyles as styles } from '../Styles/ProductViewStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { moneyFormatter } from '../moneyFormatter';
import { LoginStyle as InputStyles } from '../Styles/LoginStyle';
import { Picker } from '@react-native-picker/picker';
import { SellStyles } from '../Styles/SellStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import { thisExpression } from '@babel/types';

const screenWidth = Dimensions.get('window').width * 0.85;
const maxImages = 6

class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            photos: [],
            activeIndex: 0,
            category: "",
            title: "",
            price: "",
            description: "",
            stock: "",
            serverUri: [],
        }
    }

    componentDidMount() {
        const {product, imgs} = this.props.route.params
        var uris = imgs.map((e, i) => {
            return { uri: e.img }
        })
        console.log(uris)
        this.setState({category: product.category, photos: uris});
    }

    categories = [
        "Vehículos",
        "Tecnología",
        "Electrodomésticos",
        "Hogar y muebles",
        "Moda",
        "Deportes",
        "Herramientas",
        "Construcción",
        "Oficina",
        "Juegos y Juguetes",
        "Salud y Equipamiento Médico",
        "Belleza y Cuidado Personal",
        "Inmuebles",
    ]

    editData = () => {
        const { product } = this.props.route.params;
        var { category, title, price, description, stock } = this.state
        title = title? title: product.name;
        price = price? price: product.price;
        description = description? description: product.description;
        stock = stock? stock: product.stock;
        console.log("New data: ", product.img_id, category, title, price, description, stock)
        fetch(`https://angelgutierrezweb.000webhostapp.com/editArticle.php?name=${title}&category=${category}&price=${price}&description=${description}&stock=${stock}&img_id=${product.img_id}`)
        .then((res) => res.json())
        .catch((err) => console.error(err))
        .then((res) => {
            console.log("res: ", res)
            if (res == '1') {
                Alert.alert(
                    "Edición realizada",
                    "Su articulo ha sido actualizado",
                    [
                      { text: "ok" },
                    ],
                );
                this.props.navigation.goBack();
            } else {
                Alert.alert(
                    "Error",
                    "Ha habido un error al intentar actualizar su información, intentelo de nuevo",
                    [
                      { text: "ok" },
                    ],
                );
            }
        })
    }

    renderItem = ({item}) => {
        if (item.uri === "add") {
            return (
                <View style={[SellStyles.addImage, {width: 150, height: 150}]}>
                    <TouchableOpacity onPress={this.pickImage} style={SellStyles.add}>
                        <Icon name="add-outline" size={25} color="#cccccc"/>
                    </TouchableOpacity>
                    <Text style={{textAlign: "center"}}> Imagenes del producto </Text>
                </View>
            )
        }
        return(
            <TouchableWithoutFeedback onLongPress={this.showDelete}>
                <View>
                    <Image
                        key={item.img}
                        style={[styles.img, item.delete?{opacity:0.5}:{}]}
                        source={{uri: item.uri}}
                    />
                    {
                        item.delete &&
                        <TouchableOpacity onPress={() => this.deleteImage(item)} style={styles.del}>
                            <Icon name="remove-outline" size={20} color="#cccccc"/>
                        </TouchableOpacity>
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }

    pickImage = () => {
        if (this.state.photos.length === maxImages) {
            Alert.alert(
                "Cantidad máxima de imagenes alcanzada",
                "Si desea agregar otra mas, deberá eliminar alguna de las ya existentes,"+
                " manteniendo presionado la imagen por unos segundos.",
                [
                    { text: "OK"}
                ],
            );
            return
        }
        launchImageLibrary(
            { 
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 720,
                maxWidth: 1280,
                selectionLimit: 0,
            },
            response => {
                if (response?.didCancel == undefined) {
                    var uris = response["assets"].map((e) => {
                        return e["uri"]
                    })

                    uris = uris.map(e => {
                        return {uri: e, delete: false}
                    })
                    var oldData = this.state.photos.map( obj => {
                        obj.delete = false
                        return obj  
                    })
                    if ([...oldData, ...uris].length > maxImages) {
                        Alert.alert(
                            "Cantidad máxima de imagenes alcanzada",
                            "Si desea agregar otra mas, deberá eliminar alguna de las ya existentes,"+
                            " manteniendo presionado la imagen por unos segundos.",
                            [
                                { text: "OK"}
                            ],
                        );
                        return
                    }
                    console.log("uris: ", uris)
                    this.setState({photos: [...oldData, ...uris]});
                }
            },
        )
    }

    cancelAll = () => {
        if (this.state.photos.length > 0) {
            if (this.state.photos[0].delete === true) {
                this.showDelete()
            }
        }
    }

    showDelete = () => {
        var list = this.state.photos.map(obj => {
                obj.delete = !obj.delete
            return obj
        })
        this.setState({photos: list})
    }

    deleteImage = (item) => {
        Alert.alert(
            "Eliminar",
            "¿Esta seguro de querer eliminar esta imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                        var list = this.state.photos.filter(x => {
                            return x.uri != item.uri;
                        })
                        this.setState({photos: list})
                    }
                }
            ],
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
                        <TouchableWithoutFeedback onPress={this.cancelAll}>
                            <View>
                                <View style={{alignItems: 'center'}}> 
                                    <Carousel
                                        layout={'default'} 
                                        ref={ref => this.carousel = ref}
                                        data={[...this.state.photos, ...[{uri: "add"}]]}
                                        renderItem={this.renderItem}
                                        sliderWidth={screenWidth}
                                        itemWidth={150}
                                        onSnapToItem = { index => this.setState({activeIndex:index}) }
                                        />
                                    <Pagination
                                        dotsLength={this.state.photos.length +1 }
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
                                    <View style={SellStyles.pickerContainer}>
                                        <Picker selectedValue={this.state.category}
                                                onValueChange={(category) => this.setState({category})}
                                                style={SellStyles.picker}
                                                >
                                            { 
                                                this.categories.map((e, i) => {
                                                    return <Picker.Item label={e} value={e} key={i}/>
                                                }) 
                                            }
                                        </Picker>
                                    </View>
                                    <TextInput onChangeText={(title) => this.setState({title})} 
                                    style={InputStyles.textInput} value={this.state.title}
                                    placeholder={"Titulo: "+product.name}
                                    />
                                    <TextInput onChangeText={(price) => { if (!price.match(/[ |-]+/)) this.setState({price}) }} 
                                    style={InputStyles.textInput} value={this.state.price}
                                    placeholder={"Precio: $ "+ moneyFormatter(parseFloat(product.price))}
                                    keyboardType="numeric"
                                    />
                                    <TextInput onChangeText={(description) => this.setState({description})} 
                                    style={InputStyles.textInput} value={this.state.description}
                                    multiline={true}
                                    placeholder={"Descripción: "+product.description}
                                    />
                                    <TextInput onChangeText={(stock) => { if (!stock.match(/[ |-]+/)) this.setState({stock}) }} 
                                    style={InputStyles.textInput} value={this.state.stock}
                                    placeholder={"stock: "+product.stock}
                                    keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={{width: "75%"}} onPress={this.editData}> 
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
