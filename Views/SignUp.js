import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LoginStyle as styles } from '../Styles/LoginStyle';
import Icon from 'react-native-vector-icons/Ionicons';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            name: '',
            mail: '',
            password: '',
            passAux: '',
        }
    }

    endSignUp = () => {
        var band = false;
        Object.keys(this.state).map((e) => {
            if (e != 'hide') {
                if (this.state[e] === ''){
                    band = true;
                }
            }
        });

        if (band) {
            Alert.alert(
                "Campo vacio",
                "Alguno de los campos no fue llenado correctamente.  \n\nVerifique su información",
                [{text: "OK"}]
            );
        } else if (this.state.password !== this.state.passAux) {
            Alert.alert(
                "Las contraseñas no coinciden",
                "Verifique su información, e intentelo de nuevo",
                [{text: "OK"}]
            );
        } else if (!this.state.mail.match(/.@.\../)) {
            Alert.alert(
                "Correo erroneo",
                "Verifique su información, e intentelo de nuevo",
                [{text: "OK"}]
            );
        } else {
            this.setState({
                hide: true,
                name: '',
                mail: '',
                password: '',
                passAux: '',
            })
            this.props.loadPage("menu");
        }
    }

    goBack = () => {
        this.props.loadPage("sign in");
    }
    
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
                            <TextInput onChangeText={(mail) => this.setState({mail})} 
                                    style={styles.textInput} value={this.state.mail}
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