import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Views/Login';
import SignUp from './Views/SignUp';
import Menu from './Views/Menu';
import ProductView from './Views/ProductView';
import EditView from './Views/EditView';
import { LogBox } from 'react-native';
import PasswordEdit from './Views/PasswordEdit';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Sign Up" component={SignUp}/>
          <Stack.Screen name="Menu" component={Menu}/>
          <Stack.Screen name="ProductView" component={ProductView}/>
          <Stack.Screen name="EditView" component={EditView}/>
          <Stack.Screen name="PasswordEdit" component={PasswordEdit}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
