import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from './Store';
import Sell from './Sell';
import MyProducts from './MyProducts';
import MyAccount from './MyAccount';

const Tab = createBottomTabNavigator();

class Menu extends Component {
    render() {
        return (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  
                  if (route.name === 'Tienda') {
                    iconName = focused ? 'cart' : 'cart-outline';
                  } else if (route.name === 'Vender') {
                    iconName = focused ? 'pricetags' : 'pricetags-outline';
                  } else if (route.name === 'Mis productos') {
                    iconName = focused ? 'pencil' : 'pencil-outline';
                  } else if (route.name === 'Mi cuenta') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                  }
                  
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#2C2B2E',
                tabBarStyle: {
                  backgroundColor: '#93a8ac',
                },
              })}
            >
              {/* tab para comprar */}
              <Tab.Screen name="Tienda" component={Store} />
              {/* tab para vender productos  */}
              <Tab.Screen name="Vender" component={Sell} />
              {/* tab para editar mis productos publicados */}
              <Tab.Screen name="Mis productos" component={MyProducts} />
              {/* tab para mostrar los datos de mi cuenta */}
              <Tab.Screen name="Mi cuenta" children={() => <MyAccount loadPage={this.props.loadPage}/>} />
            </Tab.Navigator>
        )
    }
}

export default Menu;