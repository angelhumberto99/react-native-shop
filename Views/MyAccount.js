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

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Mi Cuenta</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <Text> {this.props.user} </Text>
                    <Text> {this.props.email} </Text>
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