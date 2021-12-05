import React, { Component } from 'react';
import { Text, View, TextInput,
         TouchableOpacity, ScrollView, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { LoginStyle as styles } from '../Styles/LoginStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import md5 from 'md5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            name: '',
            email: '',
            password: '',
            passAux: '',
        }
    }

    storeData = async (email, user) => {
        try {
            var jsonData = JSON.stringify({email, user});
            await AsyncStorage.setItem('@credentials', jsonData);
            this.setState({
                hide: true,
                name: '',
                email: '',
                password: '',
                passAux: '',
            })
            this.props.navigation.navigate("Menu", {email, user});
        } catch (e) {
            console.log(e)
        }
    }

    fetchData = () => {
        // URL del servidor
        var url = 'https://angelgutierrezweb.000webhostapp.com/sign_Up.php';
        // Datos que se guardarán en la base de datos
        var data = {
            name: this.state.name,
            password: md5(this.state.password),
            email: this.state.email
        };
        // Se hace la petición por el método POST
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response === '0') {
                Alert.alert(
                    "Error de conexión",
                    "Ha existido un error al conectar con la base de datos, intente de nuevo",
                    [{text: "OK"}]
                );
            } else {
                var email = this.state.email
                var name = this.state.name
                // guardamos el token para mantener la sesión abierta
                this.storeData(email, name)
            }

        });
    }

    endSignUp = () => {
        var band = false;
        // Evaluamos que los campos del formulario hayan sido llenados
        Object.keys(this.state).map((e) => {
            if (e != 'hide') {
                if (this.state[e] === ''){
                    band = true;
                }
            }
        });

        if (band) { // Revisa que se hayan llenado todos los campos del formulario
            Alert.alert(
                "Campo vacio",
                "Alguno de los campos no fue llenado correctamente.  \n\nVerifique su información",
                [{text: "OK"}]
            );
        } else if (this.state.password !== this.state.passAux) { // Revisa que las contraseñas sean identicas
            Alert.alert(
                "Las contraseñas no coinciden",
                "Verifique su información, e intentelo de nuevo",
                [{text: "OK"}]
            );
        } else if (!this.state.email.match(/.+@.+\..+/)) { // Revisa que el correo tenga formato
            Alert.alert(
                "Correo erroneo",
                "Verifique su información, e intentelo de nuevo",
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

    goBack = () => {
        // Regresa a la página de inicio de sesión
        this.props.navigation.goBack();
    }
    
    // Formulario para registrarse como usuario
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Registro</Text>
                    </View>
                    <ScrollView style={{width: '100%'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput onChangeText={(name) => this.setState({name})} 
                                    style={styles.textInput} value={this.state.name}
                                    placeholder="Nombre"
                                    />
                            <TextInput onChangeText={(email) => this.setState({email})} 
                                    style={styles.textInput} value={this.state.email}
                                    placeholder="Correo"
                                    keyboardType="email-address"
                                    />
                            <TextInput onChangeText={(password) => this.setState({password})} 
                                    style={styles.textInput} value={this.state.password}
                                    placeholder="Contraseña"
                                    secureTextEntry={this.state.hide}
                                    />
                            <TextInput onChangeText={(passAux) => this.setState({passAux})}  
                                    style={styles.textInput} value={this.state.passAux}
                                    placeholder="Contraseña"
                                    secureTextEntry={this.state.hide}
                                    /> 
                            <TouchableOpacity onPress={() => this.setState({hide: !this.state.hide})}>
                                <Icon name={this.state.hide? "eye-off-outline": "eye-outline"} 
                                    size={20} color="#424b54" style={{marginTop: 10}}/>
                            </TouchableOpacity>
                            <View style={[styles.btnContainer, {marginBottom: 20}]}>
                                <TouchableOpacity onPress={this.goBack} style={[styles.btn, styles.signIn]}>
                                    <Text style={styles.btnText}>Volver</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.endSignUp} style={[styles.btn, styles.signUp]}>
                                    <Text style={styles.btnText}>Enviar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default SignUp;