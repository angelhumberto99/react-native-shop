import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import { MyAccountStyles as Styles } from '../Styles/MyAccountStyles';
import Icon from 'react-native-vector-icons/Ionicons';

class MyAccount extends Component {
    logOut = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Está seguro de querer cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.props.navigation.navigate("Login") }
            ],
        );
        
    }

    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.mainContainer}>
                    <Text> Mi cuenta </Text>
                    <Text> {this.props?.email} </Text>
                    <View style={Styles.logOutContainer}>
                        <TouchableOpacity style={Styles.logOutBtn} onPress={this.logOut}>
                            <Icon name="log-out-outline" size={25} color="#cccccc"/>
                        </TouchableOpacity>
                        <Text style={Styles.logOutText}> Cerrar sesión </Text>
                    </View>
                </View>
            </View>

        )
    }
}

export default MyAccount;