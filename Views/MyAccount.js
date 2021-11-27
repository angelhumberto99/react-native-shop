import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import { MyAccountStyles as Styles } from '../Styles/MyAccountStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MyAccount extends Component {
    clearStore = async () => {
        try {
            // borramos los token para cerrar sesión correctamente
            await AsyncStorage.clear();
            this.props.navigation.navigate("Login")
        } catch (e) {
            console.log(e)
        }
    }

    logOut = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Está seguro de querer cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.clearStore() }
            ],
        );
        
    }

    updatePass = () => {
        this.props.navigation.navigate("PasswordEdit", { 
            navigation: this.props.navigation,
            email: this.props.email,
        });
    }

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Mi Cuenta</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <View style={Styles.infoContainer}>   
                        <Text style={Styles.title}> Información del usuario </Text>
                        <Text style={Styles.txt}> Nombre: {this.props.user} </Text>
                        <Text style={Styles.txt}> Correo: {this.props.email} </Text>
                        <TouchableOpacity style={Styles.changePass} onPress={this.updatePass}>
                            <Text style={Styles.btnTitle}>Cambiar contraseña</Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={Styles.logOutContainer}>
                        <TouchableOpacity style={Styles.logOutBtn} onPress={this.logOut}>
                            <Icon name="log-out-outline" size={25} color="#cccccc"/>
                        </TouchableOpacity>
                        <Text style={Styles.logOutText}> Cerrar sesión </Text>
                    </View>
                </View>
                <View style={MenuStyles.menu}/>
            </View>

        )
    }
}

export default MyAccount;