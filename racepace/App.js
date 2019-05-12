import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { View } from 'react-native';

import MainScreenHeader from './components/MainScreenHeader';
import EditScreen from './screens/EditScreen';
import FeedFollowingScreen from './screens/FeedFollowingScreen';
import FeedYouScreen from './screens/FeedYouScreen';
import FollowListScreen from './screens/Following';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import RouteListScreen from './screens/RouteListScreen';
import FollowScreen from './screens/FollowScreen';
import RunSetupScreen from './screens/RunSetupScreen';
import GroupScreen from './screens/GroupScreen';
import TrackingScreen from './screens/TrackingScreen';
import RealTimeRouteScreen from './screens/RealTimeRouteScreen';
//import ChatScreenTest from './screens/ChatScreenTest';

const LoginNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { header: null },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { header: null },
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: { header: null },
  },
  Follow: {
    screen: FollowScreen,
    navigationOptions: { header: null },
  },
  Track: {
    screen: TrackingScreen,
    navigationOptions: { header: null },
  },
  RealTimeRoute: {
    screen: RealTimeRouteScreen,
    navigationOptions: { header: null },
  },
  Routes: { screen: RouteListScreen, navigationOptions: { header: null } },
  FollowList: { screen: FollowListScreen, navigationOptions: { header: null } },
  Main: {
    screen: createBottomTabNavigator({
      Feed: createMaterialTopTabNavigator(
        {
          FeedFollowing: {
            screen: FeedFollowingScreen,
            navigationOptions: { title: 'Following' },
          },
          FeedYou: {
            screen: FeedYouScreen,
            navigationOptions: { title: 'You' },
          },
        },
        {
          tabBarOptions: {
            style: {
              backgroundColor: 'rgb(0, 153, 255)',
            },
          },
        }
      ),
      Run: { screen: RunSetupScreen },
      Map: { screen: MapScreen },
      Group: { screen: GroupScreen },
      RealTimeRoute: { screen: RealTimeRouteScreen },
      Profile: { screen: ProfileScreen },
    }),
    navigationOptions: { header: null, gesturesEnabled: false, },
  },
});

const AppContainer = createAppContainer(LoginNavigator);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <AppContainer />
      </View>
    );
  }
}
