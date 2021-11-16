import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';

class MyProducts extends Component {
    render() {
        return (
            <View style={MenuStyles.pageContainer}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.headerText}>Mis productos</Text>
                </View>
                <View style={MenuStyles.mainContainer}>
                    <ScrollView style={MenuStyles.scrollContainer}> 
                        <View style={MenuStyles.scrollBody}>
                            {/* código */}
                        </View>
                    </ScrollView>
                </View>
                <View style={MenuStyles.menu}/>
            </View>
        )
    }
}

export default MyProducts;
