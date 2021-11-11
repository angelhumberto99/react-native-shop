import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from './Store';
import Sell from './Sell';
import MyProducts from './MyProducts';
import MyAccount from './MyAccount';
import { MenuStyles as Styles } from '../Styles/MenuStyles';

const Tab = createBottomTabNavigator();

class Menu extends Component {
    render() {
        return (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
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
                  
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ed2143',
                tabBarInactiveTintColor: '#2C2B2E',
                tabBarStyle: {
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 15,
                  left: 15,
                  right: 15,
                  borderRadius: 15,
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
              <Tab.Screen name="Mi cuenta" children={() => <MyAccount navigation={this.props.navigation} 
                          email={this.props.route.params.email}/>}/>
            </Tab.Navigator>
        )
    }
}

export default Menu;