import React from 'react';
import Button from './components/Button';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import FeedFollowingScreen from './screens/FeedFollowingScreen';
import FeedYouScreen from './screens/FeedYouScreen'
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import RouteListScreen from './screens/RouteListScreen';
import './global.js';

const LoginNavigator = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { title: 'Login' } },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { title: 'Register' },
  },
  Main: {
    screen: createBottomTabNavigator({
      Feed: createMaterialTopTabNavigator({
        FeedFollowing: {screen: FeedFollowingScreen, navigationOptions: {title: "Following"}},
        FeedYou: {screen: FeedYouScreen, navigationOptions: {title: "You"}},
      }),
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
            style={{ left: 5, height: '80%', marginTop: '10%', width: '100%', borderRadius:5}}
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
