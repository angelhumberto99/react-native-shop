import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { LoginStyle as styles } from '../Styles/LoginStyle';
import md5 from 'md5';
import Icon from 'react-native-vector-icons/Ionicons';

class PasswordEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: "",
            newPass: "",
            newPassConfirm: "",
            hideOld: true,
            hideNew: true,
            hideConfirm: true,
        }
    }

    checkCredentials = () => {
        const { email } = this.props.route.params;
        // Se hace la petición por el método GET a la siguiente url
        fetch(`https://angelgutierrezweb.000webhostapp.com/sign_In.php?password=${md5(this.state.oldPass)}&email=${email}`)
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
                this.fetchEditPass()
            }
        });
    }

    fetchEditPass = () => {
        const { email, navigation } = this.props.route.params;
        fetch(`https://angelgutierrezweb.000webhostapp.com/editPass.php?newPass=${md5(this.state.newPass)}&email=${email}`)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response === '0') {
                Alert.alert(
                    "Error",
                    "Algo ha ocurrido, intente de nuevo",
                    [{text: "OK"}]
                );
            } else {
                Alert.alert(
                    "Edición exitosa",
                    "Su contraseña ha sido cambiada correctamente",
                    [{text: "OK", onPress: () => navigation.goBack()}]
                );
            }
        });
    }

    changePass = () => {
        // revisar si la nueva contraseña coincide con su confirmación
        if (this.state.newPass === this.state.newPassConfirm) {
            // revisar si la contraseña anterior es correcta
            this.checkCredentials()
        } else {
            Alert.alert(
                "Error de credenciales",
                "Su nueva contraseña no coincide con su confirmación",
                [{text: "OK"}]
            );
        }
    }

    render() {
        const { navigation } = this.props.route.params;
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Edición</Text>
                    </View>
                    <ScrollView style={{width: '100%'}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                            <View style={styles.passContainer}>
                                <TextInput onChangeText={(oldPass) => this.setState({oldPass})} 
                                        style={[styles.textInput, {flex: 1}]} value={this.state.oldPass} 
                                        placeholder="Contraseña anterior"
                                        secureTextEntry={this.state.hideOld}
                                        />
                                <TouchableOpacity onPress={() => this.setState({hideOld: !this.state.hideOld})}>
                                    <Icon name={this.state.hideOld? "eye-off-outline": "eye-outline"} 
                                        size={20} color="#424b54" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.passContainer}>
                                <TextInput onChangeText={(newPass) => this.setState({newPass})} 
                                        style={[styles.textInput, {flex: 1}]} value={this.state.newPass} 
                                        placeholder="Nueva ontraseña"
                                        secureTextEntry={this.state.hideNew}
                                        />
                                <TouchableOpacity onPress={() => this.setState({hideNew: !this.state.hideNew})}>
                                    <Icon name={this.state.hideNew? "eye-off-outline": "eye-outline"} 
                                        size={20} color="#424b54" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.passContainer}>
                                <TextInput onChangeText={(newPassConfirm) => this.setState({newPassConfirm})} 
                                        style={[styles.textInput, {flex: 1}]} value={this.state.newPassConfirm} 
                                        placeholder="Confirmar contraseña"
                                        secureTextEntry={this.state.hideConfirm}
                                        />
                                <TouchableOpacity onPress={() => this.setState({hideConfirm: !this.state.hideConfirm})}>
                                    <Icon name={this.state.hideConfirm? "eye-off-outline": "eye-outline"} 
                                        size={20} color="#424b54" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.btn, styles.signIn]}>
                                    <Text style={styles.btnText}>Regresar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.changePass} style={[styles.btn, styles.signUp]}>
                                    <Text style={styles.btnText}>Editar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default PasswordEdit;