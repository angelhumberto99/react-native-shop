import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LoginStyle as styles } from '../Styles/LoginStyle';
import Icon from 'react-native-vector-icons/Ionicons';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            hide: true,
        }
    }
    signIn = () => {
        if (!this.state.mail.match(/.@.\../)) {
            Alert.alert(
                "Correo erroneo",
                "Verifique su información, e intentelo de nuevo",
                [{text: "OK"}]
            );
        } else {
            // verificar información en la base de datos
            // hacer
            this.setState({mail: '', password: ''});
            this.props.loadPage("menu")
        }
    }

    signUp = () => {
        this.props.loadPage("sign up")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Iniciar sesión</Text>
                    </View>
                    <TextInput onChangeText={(mail) => this.setState({mail})} 
                               style={styles.textInput} value={this.state.mail}
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