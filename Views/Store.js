import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';

class Store extends Component {
    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.mainContainer}>
                    <Text> Tienda </Text>
                </View>
            </View>
        )
    }
}

export default Store;
