// Jason Yu

import React from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Image } from 'react-native-elements'
import Button from '../components/Button'
import '../global'
import '../assets/cat.jpeg'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import RouteListScreen from './RouteListScreen'
import StatsScreen from './StatsScreen'
import Color from '../constants/Color'

const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Color.lightBackground
  },
  profile_image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  text: {
    fontSize: 15,
    color: Color.textColor
  },
  stat_btn: {
    flex: 1,
    margin: 1,
    height: '70%',
    backgroundColor: 'transparent'
  }
})

async function logout () {
  global.login_info = {
    token: null,
    user_id: null
  }
  global.user = {
    full_name: 'guest',
    username: 'guest',
    dob: 'None',
    routes: []
  }

  global.socket.emit('disconnect') // Disconnects io connection
  await AsyncStorage.removeItem('login_info') // Deletes async storage for login
}

export default class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: global.user.full_name,
      username: global.user.username,
      age: 16,
      statistics: {
        fastest_100: 9.4,
        total_distance_run: 100,
        fastest_800: 120,
        v02_max: 56,
        average_pace: 3.4
      },
      imageurl: '../assets/cat.jpeg',
      screenVariable: true,
      bio: global.user.bio
    }
  }

  render () {
    const Nav = createMaterialTopTabNavigator({

      Stats: { screen: StatsScreen },
      Runs: { screen: RouteListScreen }

    }, {
      initialRouteName: this.props.navigation.state.params == undefined ? 'Stats' : this.props.navigation.state.params.screen,
      tabBarOptions: {
        activeTintColor: Color.textColor,
        activeBackgroundColor: Color.lightBackground,
        inactiveTintColor: Color.offColor,
        style: { backgroundColor: Color.darkBackground }
      }
    }
    )

    const AppContainer = createAppContainer(Nav)

    return (
      <View style={STYLES.container}>
        <Text style={[STYLES.text, { fontSize: 20, textAlign: 'center' }]}>
          {this.state.name}
        </Text>
        <View style={{ height: 150, padding: '3%' }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1
            }}>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center'
              }}>
              <Image
                style={STYLES.profile_image}
                source={{
                  uri: `${global.serverURL}/api/avatars/${
                    global.login_info.user_id
                  }.png`
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'space-evenly'
              }}>
              <View style={{ flexDirection: 'row', flex: 2 }}>
                <Button
                  style={STYLES.stat_btn}
                  text={`${global.user.stats.points} Pace Points`}
                  onPress={() => this.props.navigation.navigate('Level')}
                />
                <Button
                  style={STYLES.stat_btn}
                  text={`${global.user.following.length} Following`}
                  onPress={() =>
                    this.props.navigation.navigate('Follow', {
                      screen: 'Following'
                    })
                  }
                />
                <Button
                  style={STYLES.stat_btn}
                  text={`${global.user.followers.length} Followers`}
                  onPress={() =>
                    this.props.navigation.navigate('Follow', {
                      screen: 'Followers'
                    })
                  }
                />
              </View>
              <Button
                style={{ width: '100%' }}
                text="Edit Profile"
                onPress={() => {
                  console.log(global.login_info.token)
                  this.props.navigation.navigate('Edit')
                }}
                disabled={!global.login_info.token && !global.TEST}
              />
              <Button
                style={{ alignSelf: 'center'}}
                text={
                global.login_info.token
                    ? 'Logout'
                    : 'Login or Register as New'
                }
                onPress={async () => {
                if (global.login_info.token) {
                    logout();
                }
                this.props.navigation.navigate('Splash');
                }}
                />
            </View>
          </View>
        </View>
        <Text multiline={true} style={[STYLES.text, { padding: '2%' }]}>
          Bio: {this.state.bio}
        </Text>
        <View style={{ flex: 1, backgroundColor: Color.lightBackground }}>
          <AppContainer style={{ flex: 1 }}/>
        </View>

        {/* <Button
            style={{ alignSelf: 'center' }}
            text="Find Friends"
            onPress={() => this.props.navigation.navigate('FindFriends')}
          /> */}

      </View>
    )
  }
}