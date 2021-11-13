import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';

class Store extends Component {
    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Tienda</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                </View>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default Store;
