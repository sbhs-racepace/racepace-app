import React from 'react';
import Button from './components/Button';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import DetailScreen from './screens/DetailScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import RouteListScreen from './screens/RouteListScreen';
import './global.js';
//REMINDER: https://github.com/FaridSafi/react-native-gifted-chat

const LoginNavigator = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { title: 'Login' } },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { title: 'Register' },
  },
  Main: {
    screen: createBottomTabNavigator({
      Details: { screen: DetailScreen },
      Routes: { screen: RouteListScreen },
      Map: { screen: MapScreen },
      Chat: { screen: ChatScreen },
      Profile: { screen: ProfileScreen },
    }),
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button
            text="Logout"
            onPress={() => {
              navigation.navigate('Login');
              global.login_status = {};
            }}
            style={{ left: 5, height: '80%', marginTop: '10%', width: '100%' }}
            text_style={{ top: '20%' }}
          />
        ),
      };
    },
  },
});

const AppContainer = createAppContainer(LoginNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
