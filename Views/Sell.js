import React, { Component } from 'react';
import { Text,
         View,
         Button,
         Image,
         ScrollView, 
         TouchableOpacity, 
         Alert, 
         TouchableWithoutFeedback,
         Dimensions,
         ImageBackground 
        } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SellStyles as styles } from '../Styles/SellStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const maxImages = 6

class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            activeIndex: 0,
        }
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
                    console.log(uris)
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

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.mainContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.scrollBody}>
                            <Carousel
                                ref={ref => this.carousel = ref}
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
                            
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default Sell;