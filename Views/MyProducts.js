import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';

class MyProducts extends Component {
    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.mainContainer}>
                    <Text> Mis productos </Text>
                </View>
            </View>
        )
    }
}

export default MyProducts;
