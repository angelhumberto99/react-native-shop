import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

class MyAccount extends Component {
    logOut = () => {
        this.props.loadPage("sign in")
    }

    render() {
        return (
            <View>
                <Text> Mi cuenta </Text>
                <Button title="Cerrar sesión" onPress={this.logOut}/>
            </View>
        )
    }
}

export default MyAccount;