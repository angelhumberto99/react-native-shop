import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Views/Login';
import SignUp from './Views/SignUp';
import Menu from './Views/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'sign in',
    }
  }

  handleView = (view) => {
    this.setState({currentView: view});
  }

  renderState = () => {
    switch (this.state.currentView) {
      case 'sign in':
        return (
          <NavigationContainer>
            <StatusBar backgroundColor="#424b54"/>
            <Login loadPage={this.handleView}/>
          </NavigationContainer>
        );
      case 'sign up':
        return (
          <NavigationContainer>
            <StatusBar backgroundColor="#424b54"/>
            <SignUp loadPage={this.handleView}/>
          </NavigationContainer>
        );
      case 'menu':
        return (
          <NavigationContainer>
            <StatusBar backgroundColor="#424b54"/>
            <Menu loadPage={this.handleView}/>
          </NavigationContainer>
        );
    }
    return 
  }
  render() {
    return (
      this.renderState()
    );
  }
}

export default App;
