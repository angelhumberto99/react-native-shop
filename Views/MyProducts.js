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
                    <Tab.Navigator initialRouteName="OnSale"
                        screenOptions={{
                            tabBarActiveTintColor: '#2C2B2E',
                            tabBarInactiveTintColor: 'gray',
                            tabBarLabelStyle: { fontSize: 12 },
                            tabBarStyle: { backgroundColor: '#93a8ac' },
                    }}>
                        <Tab.Screen name="OnSale" component={OnSell} />
                        <Tab.Screen name="Bought" component={Bought} />
                    </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

export default MyProducts;
