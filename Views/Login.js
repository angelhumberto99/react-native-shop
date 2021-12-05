import React, { Component } from 'react';
import { Text, View, TextInput,
         TouchableOpacity, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { LoginStyle as styles } from '../Styles/LoginStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import md5 from 'md5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hide: true,
        }
    }

    componentDidMount() {
        this.checkStore()    
    }

    checkStore = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('@credentials')
            if (jsonData !== null) {
                const data = JSON.parse(jsonData)
                var { email, user } = data
                this.props.navigation.navigate("Menu", {email, user});
            }
        } catch(e) {
            console.log(e)
        }
    }

    storeData = async (email, response) => {
        try {
            var jsonData = JSON.stringify({email:email, user:response});
            await AsyncStorage.setItem('@credentials', jsonData);
            this.setState({email: '', password: '', hide: true});
            this.props.navigation.navigate("Menu", {email, user: response});
        } catch (e) {
            console.log(e)
        }
    }

    fetchData = () => {
        // Se hace la petición por el método GET a la siguiente url
        fetch(`https://angelgutierrezweb.000webhostapp.com/sign_In.php?password=${md5(this.state.password)}&email=${this.state.email}`)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response === '0') {
                Alert.alert(
                    "Error de credenciales",
                    "Su usuario o contraseña son invalidas, intente de nuevo",
                    [{text: "OK"}]
                );
            } else {
                var email = this.state.email;
                // guardamos el token para mantener la sesión abierta
                this.storeData(email, response);
            }
        });
    }

    signIn = () => {
        if (!this.state.email.match(/.+@.+\..+/)) { // Validamos el formato del correo
            Alert.alert(
                "Correo erroneo",
                "Verifique su información, e intentelo de nuevo",
                [{text: "OK"}]
            );
        } else if (this.state.email.length === 0 || this.state.password.length === 0) { 
            // Verificamos que los campos del formulario hayan sido llenados
            Alert.alert(
                "Campo vacio",
                "Alguno de los campos no fue llenado correctamente.  \n\nVerifique su información",
                [{text: "OK"}]
            );
        } else {
            // Se revisa la conexión para realizar la llamada al servidor
            NetInfo.fetch("wifi").then(state => {
                if (state.isConnected) {
                    this.fetchData();
                } else {
                    Alert.alert(
                        "Fallo de conexión",
                        "Verifique que su dispositivo cuente con una conexión a internet estable",
                        [{text: "OK"}]
                    ); 
                }
            });  
        }
    }

    signUp = () => {
        this.props.navigation.navigate('Sign Up')
    }

    // Formulario de inicio de sesión
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Iniciar sesión</Text>
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
                        <TouchableOpacity onPress={this.signIn} style={[styles.btn, styles.signIn]}>
                            <Text style={styles.btnText}>Ingresar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.signUp} style={[styles.btn, styles.signUp]}>
                            <Text style={styles.btnText}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login;