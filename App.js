// Sunny Yan, Jason Yu
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './functions/reducer';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

import { View } from 'react-native';
import EditScreen from './screens/EditScreen';
import FeedScreen from './screens/FeedScreen';
import RunListScreen from './screens/RunListScreen';
import FollowListScreen from './screens/FollowListScreen';
import FollowerScreen from './screens/FollowerScreen';
import FollowingScreen from './screens/FollowingScreen';
import SplashScreen from './screens/SplashScreen';
import MapScreen from './screens/MapScreen';
import ExtendedDetailsScreen from './screens/ExtendedDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import RouteListScreen from './screens/RouteListScreen';
import FollowerRequestScreen from './screens/FollowerRequestScreen';
import RunOtherStatsScreen from './screens/RunOtherStatsScreen';
import RunInformationScreen from './screens/RunInformationScreen';
import RunPausedScreen from './screens/RunPausedScreen';
import GroupScreen from './screens/GroupScreen';
import TrackingScreen from './screens/TrackingScreen';
import RunScreen from './screens/RunScreen';
import FindFriendsScreen from './screens/FindFriendsScreen';
import SaveRunScreen from './screens/SaveRunScreen';
import LevelScreen from './screens/LevelScreen';
import StartupScreen from './screens/StartupScreen';
import CreateRouteScreen from './screens/CreateRouteScreen'
import PlanRunScreen from './screens/PlanRunScreen'
import LoadRouteScreen from './screens/LoadRouteScreen'
import SaveRouteScreen from './screens/SaveRouteScreen'
import OtherProfileScreen from './screens/OtherProfileScreen'

import Color from './constants/Color'

const LoginNavigator = createStackNavigator({
  LoadScreen: {
    screen: StartupScreen,
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
  FollowRequests: {
    screen: FollowerRequestScreen,
    navigationOptions: { header: null },
  },
  Followers: {
    screen: FollowerScreen,
    navigationOptions: { header: null },
  },
  Following: {
    screen: FollowingScreen,
    navigationOptions: { header: null },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: { header: null },
  },
  Tracking: {
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
  RunManager: {
    screen: RunScreen,
    navigationOptions: { header: null },
  },
  Information: {
    screen: RunInformationScreen,
    navigationOptions: { header: null },
  },
  OtherStats: {
    screen: RunOtherStatsScreen,
    navigationOptions: { header: null },
  },
  ExtendedDetails: {
    screen: ExtendedDetailsScreen,
    navigationOptions: { header: null },
  },
  Paused: {
    screen: RunPausedScreen,
    navigationOptions: { header: null },
  },
  OtherProfile: {
    screen: OtherProfileScreen,
    navigationOptions: { header: null },
  },
  Level: {
    screen: LevelScreen,
    navigationOptions: { header: null },
  },
  SaveRoute: {
    screen: SaveRouteScreen,
    navigationOptions: { header: null },
  },
  Routes: { screen: RouteListScreen, navigationOptions: { header: null } },
  Follow: { screen: FollowListScreen, navigationOptions: { header: null } },
  Main: {
    screen: createBottomTabNavigator({
      Feed: createMaterialTopTabNavigator(
        {
          Feed: {
            screen: FeedScreen,
            navigationOptions: { title: 'Feed' },
          },
          RecentRuns: {
            screen: RunListScreen,
            navigationOptions: { title: 'You' },
          },
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesomeIcon name="feed" size={25} color={Color.primaryColor}/>
            )
          },
          tabBarOptions: {
            activeTintColor: Color.textColor,
            inactiveTintColor: Color.offColor,
            indicatorStyle: {
                backgroundColor: Color.primaryColor
            },
            style: {backgroundColor: Color.darkBackground},
          },
        }
      ),
      Setup: createMaterialTopTabNavigator(
        {
          Run: { screen: PlanRunScreen, navigationOptions: { title: 'Plan Run' }},
          Route: { screen: CreateRouteScreen, navigationOptions: { title: 'Create Route' }},
          Load: { screen: LoadRouteScreen, navigationOptions: { title: 'Load Route' }},
        },
        {
          initialRouteName: 'Route',
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <FontAwesomeIcon name="gear" size={25} color={Color.primaryColor}/>
            )
          },
          tabBarOptions: {
            activeTintColor: Color.textColor,
            inactiveTintColor: Color.offColor,
            indicatorStyle: {
                backgroundColor: Color.primaryColor
            },
            style: {backgroundColor: Color.darkBackground,},
          },
        }
      ),
      Map: { 
        screen: MapScreen, 
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcon name="map-marker" size={25} color={Color.primaryColor}/>
          )
        } 
      },
      People: { 
        screen: GroupScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <FontAwesomeIcon name="group" size={25} color={Color.primaryColor}/>
          )
        },
      },
      Profile: { 
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <FontAwesomeIcon name="user" size={25} color={Color.primaryColor}/>
          )
        },
       },
    },
    {
      navigationOptions: { 
        header: null, 
        gesturesEnabled: false 
      },
      tabBarOptions: {
        activeTintColor: Color.textColor,
        inactiveTintColor: Color.offColor,
        style: { backgroundColor: Color.darkBackground,},
        labelStyle: {fontSize: 10},
        tabStyle: {
            height:50, 
            borderColor:Color.primaryColor,
        },
        showIcon: true,
      }
    })
  },
});

const AppContainer = createAppContainer(LoginNavigator);
const store = createStore(reducer)

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
          <View style={{height:20, backgroundColor: Color.darkBackground}}/>
          <AppContainer 
            style={{backgroundColor: Color.darkBackground}}
          />
      </Provider>
    );
  }
}