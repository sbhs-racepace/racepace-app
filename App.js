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
import SplashScreen from './screens/SplashScreen';
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
import FindFriendsScreen from './screens/FindFriendsScreen';
import SaveRunScreen from './screens/SaveRunScreen';
import LevelScreen from './screens/LevelScreen';
import LoadScreen from './screens/LoadScreen';

import Color from './constants/Color'

const LoginNavigator = createStackNavigator({
  LoadScreen: {
    screen: LoadScreen,
    navigationOptions: { header: null },
  },
  Splash: {
    screen: SplashScreen,
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
  FindFriends: {
    screen: FindFriendsScreen,
    navigationOptions: { header: null },
  },
  SaveRun: {
    screen: SaveRunScreen,
    navigationOptions: { header: null },
  },
  Level: {
    screen: LevelScreen,
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
            activeTintColor: Color.textColor,
            inactiveTintColor: Color.offColor,
            style: {backgroundColor: Color.darkBackground},
          },
        }
      ),
      Run: { screen: RunSetupScreen },
      Map: { screen: MapScreen },
      Group: { screen: GroupScreen },
      RealTimeRoute: { screen: RealTimeRouteScreen },
      Chat: { screen: ChatScreen },
      Profile: { screen: ProfileScreen },
    },
    {
      navigationOptions: { 
        header: null, 
        gesturesEnabled: false 
      },
      tabBarOptions: {
        activeTintColor: Color.textColor,
        inactiveTintColor: Color.offColor,
        style: { backgroundColor: Color.darkBackground },
      }
    })
  },
});

const AppContainer = createAppContainer(LoginNavigator);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20, backgroundColor:Color.darkBackground}}>
        <AppContainer style={{backgroundColor:Color.darkBackground}}/>
      </View>
    );
  }
}