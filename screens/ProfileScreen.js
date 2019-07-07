// Jason Yu

import React from 'react'
import { View, Text, StyleSheet, AsyncStorage, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Image, Icon } from 'react-native-elements'
import Button from '../components/Button'
import '../global'
import '../assets/cat.jpeg'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import RouteListScreen from './RouteListScreen'
import StatsScreen from './StatsScreen'
import Color from '../constants/Color'
import { logout } from '../functions/user_info_action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    borderRadius: 50,
    paddingRight: '1%',
    alignSelf:'center',
  },
  text: {
    fontSize: 15,
    color: Color.textColor,
  },
  stat_btn: {
    backgroundColor: 'transparent',
    width: undefined,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderLeftWidth: 2,
    borderLeftColor: Color.lightBackground
  }
})

class ProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.user.full_name,
      username: this.props.user.username,
      age: 16,
      statistics: {
        fastest_100: 9.4,
        total_distance_run: 100,
        fastest_800: 120,
        v02_max: 56,
        average_pace: 3.4
      },
      bio: this.props.user.bio
    }
  }

  async logoutCall() {
    if (this.props.user.token != null) { // Is not a Guest account
      this.props.user.socket.emit('disconnect') // Disconnects io connection
      await AsyncStorage.removeItem('login_info') // Deletes async storage for login
    }
    this.props.logout(); // Reset
  }

  render () {
    const Nav = createMaterialTopTabNavigator({

      Stats: { screen: StatsScreen },
      Routes: { screen: RouteListScreen }

    }, {
      initialRouteName: this.props.navigation.state.params == undefined ? 'Stats' : this.props.navigation.state.params.screen,
      tabBarOptions: {
        activeTintColor: Color.textColor,
        indicatorStyle: {
            backgroundColor: Color.primaryColor
        },
        inactiveTintColor: Color.offColor,
        style: { backgroundColor: Color.buttonColor }
      }
    }
    )

    const AppContainer = createAppContainer(Nav)

    return (
      <View style={STYLES.container}>
        <Text style={[STYLES.text, { fontSize: 30, textAlign: 'center', paddingTop: '5%', fontFamily:'Roboto-Bold', color:Color.primaryColor}]}>{this.state.name}</Text>
        <View style={{ height: 150, padding: '3%' }}>
          <View style={{flexDirection: 'row',flex: 1}}>
            <View style={{flexDirection: 'row',flex: 1,alignItems: 'center'}}>
              <Image
                style={STYLES.profile_image}
                source={{
                uri: `${global.serverURL}/api/avatars/${
                  this.props.user.user_id
                }.png`
                }}
              />
            </View>

            <View style={{
              flexDirection: 'column',
              flex: 2,
              justifyContent: 'space-evenly'
            }}>

            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <Button
                style={STYLES.stat_btn}
                text={`${this.props.user.stats.points} points`}
                onPress={() => this.props.navigation.navigate('Level')}
              />
              <Button
                style={STYLES.stat_btn}
                text={`${this.props.user.following.length} Following`}
                onPress={() =>
                  this.props.navigation.navigate('Follow', {
                  screen: 'Following'
                  })
                }
              />
              <Button
                style={STYLES.stat_btn}
                text={`${this.props.user.followers.length} Followers`}
                onPress={() =>
                  this.props.navigation.navigate('Follow', {
                  screen: 'Followers'
                  })
                }
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -20}}>
              <Button
                style={{width: '70%', backgroundColor: Color.buttonColor}}
                text="Edit Profile"
                onPress={() => {
                console.log(this.props.user.token)
                this.props.navigation.navigate('Edit')
                }}
                disabled={!this.props.user.token && !global.TEST}
              />
              <Button
                style={{width: '30%', borderLeftWidth: 2, borderLeftColor: Color.lightBackground}}
                text_style={{color: "#e74c3c"}}
                text="Logout"
                onPress={async () => {
                  if (this.props.user.token) this.logoutCall();
                  this.props.navigation.navigate('Splash');
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <Text multiline={true} style={[STYLES.text, { paddingBottom: '8%', paddingLeft: '5%'}]}>{this.state.bio}</Text>
      <View style={{ flex: 1, backgroundColor: Color.darkBackground }}>
        <AppContainer style={{ flex: 1 }}/>
      </View>
    </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
