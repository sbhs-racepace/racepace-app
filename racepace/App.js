import React from 'react';
import Button from './components/Button';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  SafeAreaView
} from 'react-navigation';
import FeedFollowingScreen from './screens/FeedFollowingScreen';
import FeedYouScreen from './screens/FeedYouScreen'
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import RouteListScreen from './screens/RouteListScreen';
import FollowScreen from './screens/FollowScreen';
import './global.js';

const LoginNavigator = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null } },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { title: 'Register' },
  },
  Follow : { screen: FollowScreen},
  Main: {
    screen: 
      createBottomTabNavigator({
        Feed: createMaterialTopTabNavigator({
          FeedFollowing: {screen: FeedFollowingScreen, navigationOptions: {title: "Following"}},
          FeedYou: {screen: FeedYouScreen, navigationOptions: {title: "You"}},
        }),
        Routes: { screen: RouteListScreen },
        Map: { screen: MapScreen },
        Chat: { screen: ChatScreen },
        Profile: { screen: ProfileScreen },
        
      }),
    navigationOptions: {
      header: null,
    }
  },
});

const AppContainer = createAppContainer(LoginNavigator);

export default class App extends React.Component {
  render() {
    return (
    <SafeAreaView style={{flex:1}}>
      <AppContainer />
    </SafeAreaView>
    )
  }
}
