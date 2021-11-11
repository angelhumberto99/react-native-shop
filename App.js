import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Views/Login';
import SignUp from './Views/SignUp';
import Menu from './Views/Menu';

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Sign Up" component={SignUp}/>
          <Stack.Screen name="Menu" component={Menu}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
