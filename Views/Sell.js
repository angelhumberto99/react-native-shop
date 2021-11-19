import React, { Component } from 'react';
import { Text, View, Button, Image,ScrollView, 
         TouchableOpacity, Alert, TouchableWithoutFeedback, 
         Dimensions, ImageBackground, TextInput } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SellStyles as styles } from '../Styles/SellStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { LoginStyle as InputStyles } from '../Styles/LoginStyle';
import NetInfo from "@react-native-community/netinfo";

const screenWidth = Dimensions.get('window').width;
const maxImages = 6

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    this.setState({photos: [...oldData, ...uris]});
                }
            },
        )
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

    renderItem = ({item}) => {
        if (item.uri === "add") {
            return (
                <View style={styles.addImage}>
                    <TouchableOpacity onPress={this.pickImage} style={styles.add}>
                        <Icon name="add-outline" size={25} color="#cccccc"/>
                    </TouchableOpacity>
                    <Text> Imagenes del producto </Text>
                </View>
            )
        }
        return(
            <TouchableWithoutFeedback onLongPress={this.showDelete}>
                <View>
                    <Image
                        key={item.uri}
                        style={[styles.image, item.delete?{opacity:0.5}:{}]}
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

    uploadImageToServer = async (imageUri) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        var reader = new FileReader();
        reader.onload = () => {
            var InsertAPI = 'https://angelgutierrezweb.000webhostapp.com/upload.php'
            var Data={img:reader.result};
            var headers={
                'Accept':'application/json',
                'Content-Type':'application.json'
            }
            fetch(InsertAPI,{
                method:'POST',
                headers:headers,
                body:JSON.stringify(Data),
            }).then((response)=>response.json()).then((response)=>{
                this.setState({serverUri: [...this.state.serverUri, "https://angelgutierrezweb.000webhostapp.com/"+response]})
            }).then(() => {
                if (this.state.serverUri.length == this.state.photos.length) {
                    this.fetchData()
                }
            }).catch(err=>{
                console.log(err);
            })
        }
        reader.readAsDataURL(blob);
    }

    fetchData = () => {
        // URL del servidor
        var url = 'https://angelgutierrezweb.000webhostapp.com/sell_article.php';
        // Datos que se guardarán en la base de datos
        var data = {
            name: this.state.title,
            stock: this.state.stock,
            img_id: this.state.serverUri[0],
            description: this.state.description,
            owner: this.props.user,
            on_sale: 1,
            category: this.state.category,
            price: this.state.price,
            imgs: this.state.serverUri,
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
            } else {
                Alert.alert(
                    "Articulo publicado",
                    "Su articulo ha sido publicado exitosamente",
                    [{text: "OK"}]
                );
                this.setState({
                    photos: [],
                    activeIndex: 0,
                    category: "Vehículos",
                    title: "",
                    price: "",
                    description: "",
                    stock: "",
                })
            }
                    
        }).catch(error => console.error('Error:', error));
    }

    storeData = () => {
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {    
                // revisar que ningún campo esté vacio
                var emptyField = false;
                Object.keys(this.state).map((e) => {
                    if (e == 'photos') {
                        if (this.state[e].length === 0){
                            emptyField = true;
                        }
                    } else if (e != 'activeIndex') {
                        if (this.state[e] === "") {
                            emptyField = true;
                        }
                    }
                });

                var { price, stock } = this.state

                if (Number.parseFloat(price) <= 0 || Number.parseFloat(stock) <= 0) {
                    Alert.alert(
                        "Valores iguales a cero",
                        "Ninguno de los campos numericos puede ser igual a cero, verifique su información",
                        [{text: "OK"}]
                    );
                }

                if (!emptyField) {
                    this.state.photos.map(e => {
                        this.uploadImageToServer(e.uri);
                    }); 
                } else {
                    Alert.alert(
                        "Campos vacios",
                        "Alguno de los campos no ha sido llenado correctamente, verifique su información",
                        [{text: "OK"}]
                    );
                }

            } else {
                Alert.alert(
                    "Fallo de conexión",
                    "Verifique que su dispositivo cuente con una conexión a internet estable",
                    [{text: "OK"}]
                ); 
            }
        });
        
    }

    cancelAll = () => {
        if (this.state.photos.length > 0) {
            if (this.state.photos[0].delete === true) {
                this.showDelete()
            }
        }
    }

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Vender</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <ScrollView style={MenuStyles.scrollContainer}>
                        <TouchableWithoutFeedback onPress={this.cancelAll}>
                            <View style={MenuStyles.scrollBody}>
                                <Carousel
                                    layout={'default'} 
                                    ref={ref => this.carousel = ref}
                                    data={[...this.state.photos, ...[{uri:"add"}]]}
                                    renderItem={this.renderItem}
                                    sliderWidth={screenWidth}
                                    itemWidth={200}
                                    onSnapToItem = { index => this.setState({activeIndex:index}) }
                                />
                                <Pagination
                                    dotsLength={this.state.photos.length+1}
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
                                <View style={[styles.pickerContainer, this.state.photos.length > 0? {marginTop:0}: {}]}>
                                    <Picker selectedValue={this.state.category}
                                            onValueChange={(category) => this.setState({category})}
                                            style={styles.picker}
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
                                placeholder="Titulo"
                                />
                                <TextInput onChangeText={(price) => { if (!price.match(/[ |-]+/)) this.setState({price}) }} 
                                style={InputStyles.textInput} value={this.state.price}
                                placeholder="Precio"
                                keyboardType="numeric"
                                />
                                <TextInput onChangeText={(description) => this.setState({description})} 
                                style={InputStyles.textInput} value={this.state.description}
                                multiline={true}
                                placeholder="Descripción"
                                />
                                <TextInput onChangeText={(stock) => { if (!stock.match(/[ |-]+/)) this.setState({stock}) }} 
                                style={InputStyles.textInput} value={this.state.stock}
                                placeholder="Unidades"
                                keyboardType="numeric"
                                />
                                <TouchableOpacity style={styles.sendBtn} onPress={this.storeData}>
                                    <Text style={styles.sendTxt}>Enviar</Text>
                                    <Icon name={"arrow-up"} size={25} color="#424b54" style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Sell;