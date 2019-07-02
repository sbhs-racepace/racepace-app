// Sunny Yan, Jason Yu
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { runReducer } from './functions/reducer'

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'

import { View } from 'react-native'
import EditScreen from './screens/EditScreen'
import FeedScreen from './screens/FeedScreen'
import PreviousRunsScreen from './screens/PreviousRunsScreen'
import FollowingScreen from './screens/FollowingScreen'
import SplashScreen from './screens/SplashScreen'
import MapScreen from './screens/MapScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ChatScreen from './screens/ChatScreen'
import RouteListScreen from './screens/RouteListScreen'
import FollowerRequestScreen from './screens/FollowerRequestScreen'
import RunSetupScreen from './screens/RunSetupScreen'
import RunOtherStatsScreen from './screens/RunOtherStatsScreen'
import RunInformationScreen from './screens/RunInformationScreen'
import RunPausedScreen from './screens/RunPausedScreen'
import GroupScreen from './screens/GroupScreen'
import TrackingScreen from './screens/TrackingScreen'
import RunScreen from './screens/RunScreen'
import FindFriendsScreen from './screens/FindFriendsScreen'
import SaveRunScreen from './screens/SaveRunScreen'
import SaveRecentRunScreen from './screens/SaveRecentRunScreen'
import LevelScreen from './screens/LevelScreen'
import StartupScreen from './screens/StartupScreen'

import Color from './constants/Color'

const LoginNavigator = createStackNavigator({
  LoadScreen: {
    screen: StartupScreen,
    navigationOptions: { header: null }
  },
  Splash: {
    screen: SplashScreen,
    navigationOptions: { header: null }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { header: null }
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: { header: null }
  },
  FollowRequests: {
    screen: FollowerRequestScreen,
    navigationOptions: { header: null }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: { header: null }
  },
  Tracking: {
    screen: TrackingScreen,
    navigationOptions: { header: null }
  },
  FindFriends: {
    screen: FindFriendsScreen,
    navigationOptions: { header: null }
  },
  SaveRun: {
    screen: SaveRunScreen,
    navigationOptions: { header: null }
  },
  RunManager: {
    screen: RunScreen,
    navigationOptions: { header: null }
  },
  Information: {
    screen: RunInformationScreen,
    navigationOptions: { header: null }
  },
  OtherStats: {
    screen: RunOtherStatsScreen,
    navigationOptions: { header: null }
  },
  Paused: {
    screen: RunPausedScreen,
    navigationOptions: { header: null }
  },
  SaveRecentRun: {
    screen: SaveRecentRunScreen,
    navigationOptions: { header: null }
  },
  Level: {
    screen: LevelScreen,
    navigationOptions: { header: null }
  },
  Routes: { screen: RouteListScreen, navigationOptions: { header: null } },
  Follow: { screen: FollowingScreen, navigationOptions: { header: null } },
  Main: {
    screen: createBottomTabNavigator({
      Feed: createMaterialTopTabNavigator(
        {
          Feed: {
            screen: FeedScreen,
            navigationOptions: { title: 'Feed' }
          },
          PreviousRuns: {
            screen: PreviousRunsScreen,
            navigationOptions: { title: 'You' }
          }
        },
        {
          tabBarOptions: {
            activeTintColor: Color.textColor,
            inactiveTintColor: Color.offColor,
            style: { backgroundColor: Color.darkBackground }
          }
        }
      ),
      Setup: { screen: RunSetupScreen },
      Map: { screen: MapScreen },
      Groups: { screen: GroupScreen },
      Profile: { screen: ProfileScreen }
    },
    {
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      },
      tabBarOptions: {
        activeTintColor: Color.textColor,
        inactiveTintColor: Color.offColor,
        style: { backgroundColor: Color.darkBackground }
      }
    })
  }
})

const AppContainer = createAppContainer(LoginNavigator)
const store = createStore(runReducer)

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{ height: 20, backgroundColor: Color.lightBackground }}/>
        <AppContainer
          style={{ backgroundColor: Color.darkBackground }}
        />
      </Provider>
    )
  }
}
