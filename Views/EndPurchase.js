import React, { Component } from 'react';
import { Text, View, TextInput, 
         TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LoginStyle as styles } from '../Styles/LoginStyle';
import md5 from 'md5';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";

class EndPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            hide: true,
        }
    }

    checkCredentials = () => {
        const { handleFinish, navigation } = this.props.route.params;

        // Se revisa la conexión para realizar la llamada al servidor
        NetInfo.fetch("wifi").then(state => {
            if (state.isConnected) {
                // Se hace la petición por el método GET a la siguiente url
                fetch(`https://angelgutierrezweb.000webhostapp.com/sign_In.php?password=${md5(this.state.password)}&email=${this.state.email}`)
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response === '0') {
                        Alert.alert(
                            "Error de credenciales",
                            "Su contraseña anterior es invalida, intente de nuevo",
                            [{text: "OK"}]
                        );
                    } else {
                        Alert.alert(
                            "Compra exitosa",
                            "Su compra ha sido efectuada correctamente",
                            [{text: "OK", onPress: () => {
                                handleFinish()
                                navigation.goBack()
                            }}]
                        );
                    }
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
        const { total, navigation } = this.props.route.params;
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Confirme su compra</Text>
                    </View>
                    <ScrollView style={{width: '100%'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                            <View style={{paddingLeft: 30, paddingRight: 30}}>
                                <Text>Ingrese sus credenciales para finalizar su compra</Text>
                                <Text style={{marginTop: 10}}>Total a pagar $ {total}</Text>
                            </View>
                            <TextInput onChangeText={(email) => this.setState({email})} 
                                        style={styles.textInput} value={this.state.email} 
                                        placeholder="Correo"
                                        keyboardType="email-address"
                                        />
                            <View style={styles.passContainer}>
                                <TextInput onChangeText={(password) => this.setState({password})} 
                                        style={[styles.textInput, {flex: 1}]} value={this.state.password} 
                                        placeholder="Contraseña"
                                        secureTextEntry={this.state.hide}
                                        />
                                <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                    <Icon name={this.state.hide? "eye-off-outline": "eye-outline"} 
                                        size={20} color="#424b54" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.btn, styles.signIn]}>
                                    <Text style={styles.btnText}>Regresar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.checkCredentials} style={[styles.btn, styles.signUp]}>
                                    <Text style={styles.btnText}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

        )
    }
}

export default EndPurchase;