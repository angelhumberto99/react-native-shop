import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Store from './Store';
import Cart from './Cart'; 
import Sell from './Sell';
import MyProducts from './MyProducts';
import MyAccount from './MyAccount';

const Tab = createBottomTabNavigator();

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
        const { email, user } = this.props.route.params
        return (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  
                  if (route.name === 'Tienda') {
                    iconName = focused ? 'storefront' : 'storefront-outline';
                    return <Icon name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Carrito') {
                    iconName = focused ? 'cart' : 'cart-outline';
                  } else if (route.name === 'Vender') {
                    iconName = focused ? 'pricetags' : 'pricetags-outline';
                  } else if (route.name === 'Mis productos') {
                    iconName = focused ? 'pencil' : 'pencil-outline';
                  } else if (route.name === 'Mi cuenta') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                  }
                  
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ed2143',
                tabBarInactiveTintColor: '#2C2B2E',
                tabBarStyle: {
                  backgroundColor: '#e4eaeb',
                  position: 'absolute',
                  bottom: 15,
                  left: 15,
                  right: 15,
                  borderRadius: 15,
                },  
              })}
            >
              {/* tab para comprar */}
              <Tab.Screen name="Tienda" children={() => <Store email={email} user={user} navigation={this.props.navigation}/>}/>
              {/* tab para carrito */}
              <Tab.Screen name="Carrito" children={() => <Cart email={email} user={user} navigation={this.props.navigation}/>}/>
              {/* tab para vender productos  */}
              <Tab.Screen name="Vender" children={() => <Sell email={email} user={user}/>}/>
              {/* tab para editar mis productos publicados */}
              <Tab.Screen name="Mis productos" children={() => <MyProducts email={email} user={user} navigation={this.props.navigation}/>}/>
              {/* tab para mostrar los datos de mi cuenta */}
              <Tab.Screen name="Mi cuenta" children={() => <MyAccount navigation={this.props.navigation} 
                          email={email} user={user}/>}/>
            </Tab.Navigator>
        )
    }
}

export default Menu;