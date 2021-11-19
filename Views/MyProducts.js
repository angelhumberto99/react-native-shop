import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { MenuStyles } from '../Styles/MenuStyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnSell from './OnSell';
import { NavigationContainer } from '@react-navigation/native';
import Bought from './Bought';

const Tab = createMaterialTopTabNavigator();

class MyProducts extends Component {
    render() {
        return (
            <NavigationContainer independent={true}>
                    <View style={MenuStyles.header}>
                        <Text style={MenuStyles.headerText}>Mis Productos</Text>
                    </View>
                    <Tab.Navigator 
                        screenOptions={{
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: '#3b4652',
                            tabBarLabelStyle: { fontSize: 10, marginBottom: 10, fontStyle: 'italic'},
                            tabBarStyle: { 
                                height: 40,
                                backgroundColor: '#93a8ac',
                            },
                        }}
                    >
                        <Tab.Screen name="En Venta" children={() => <OnSell email={this.props.email} 
                            navigation={this.props.navigation}/>} />
                        <Tab.Screen name="Comprado" children={() => <Bought email={this.props.email} 
                            navigation={this.props.navigation}/>} />
                    </Tab.Navigator>
                    <View style={[MenuStyles.menu, {backgroundColor: '#ced7d9'}]}/>
            </NavigationContainer>
        )
    }
}

export default MyProducts;
