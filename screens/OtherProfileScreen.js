// Jason Yu and Abdur Raqeeb Mohammed

import React from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert, ScrollView, KeyboardAvoidingView, Dimensions} from 'react-native'
import { Image, Icon } from 'react-native-elements'
import Button from '../components/Button'
import '../global'
import '../assets/cat.jpeg'
import BackButtonHeader from '../components/BackButtonHeader'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import RouteListScreen from './RouteListScreen'
import StatsScreen from './StatsScreen'
import SavedRunListScreen from './SavedRunListScreen'
import Color from '../constants/Color'
import { connect } from 'react-redux';
import { requestFollow } from '../functions/user_info_action'
import { bindActionCreators } from 'redux';


const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const STYLES = StyleSheet.create({
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
      width: '33%',
      marginTop: -10,
      marginBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      borderLeftWidth: 2,
      borderLeftColor: Color.lightBackground
    }
  })

class OtherProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    let info = this.props.navigation.state.params.info
    let string_user_id = String(this.props.user.user_id)
    this.state = {
        info: info,
        following: info.followers.includes(string_user_id),
        requested: info.follow_requests.includes(string_user_id)
    }
  }

  async followUser() {
    let user_id = this.props.navigation.state.params['user_id']
    let data = {other_user_id:user_id}
    let following = this.state.following 
    let api_url = global.serverURL+'/api/sendFollowRequest'
    if (following) {
        api_url = global.serverURL+'/api/unfollow'
    }

    await fetch(api_url, 
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({'Authorization': this.props.user.token})
        })
      .catch(res => {
        Alert.alert('Error connecting to server', res);
      })
      .then(
        async res_data => {
          res_data = await res_data.json()
          console.log(res_data)
          if (res_data.success == true) {
            if (following) { 
              this.setState({'following': false, 'requested': false})
              this.props.requestFollow(user_id)
            } else {
              this.setState({'requested': true})
            }

          } else {
            Alert.alert("Couldn't send request.")
          }

        }
      );
  }


  render () {
    let info = this.props.navigation.state.params['info']
    let user_id = this.props.navigation.state.params['user_id']
    let following = this.state.following
    let requested = this.state.requested

    // const Nav = createMaterialTopTabNavigator({
    //     Stats: { screen: StatsScreen },
    //     Routes: { screen: RouteListScreen },
    //     Saved: {screen: SavedRunListScreen},
    // }, {
    //   initialRouteName: this.props.navigation.state.params == undefined ? 'Stats' : this.props.navigation.state.params.screen,
    //   tabBarOptions: {
    //     activeTintColor: Color.textColor,
    //     indicatorStyle: {
    //         backgroundColor: Color.primaryColor
    //     },
    //     inactiveTintColor: Color.offColor,
    //     style: { backgroundColor: Color.buttonColor }
    //   }
    // }
    // )

    // const AppContainer = createAppContainer(Nav)

    return (
      <View style={{backgroundColor: Color.darkBackground, flex:1}}>
        <BackButtonHeader
          onPress={this.props.navigation.goBack}
          title='Profile'
        />
        <ScrollView style={{backgroundColor:Color.lightBackground, height:300}}>
          <Text style={[STYLES.text, { fontSize: 30, textAlign: 'center', paddingTop: '5%', fontFamily:'Roboto-Bold', color:Color.primaryColor}]}>{info.full_name}</Text>
          <View style={{ height: 150, padding: '3%', flexDirection:'row'}}>
            <View style={{flexDirection: 'row',flex: 1,alignItems: 'center'}}>
              <Image
                key={Math.random()}
                style={STYLES.profile_image}
                source={{
                uri: `${global.serverURL}/api/avatars/${user_id}.png`
                }}
              />
            </View>

            <View 
              style={{
                flexDirection: 'column',
                flex: 2,
                justifyContent: 'space-evenly',
              }}
            >
              <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                <Button
                  style={STYLES.stat_btn}
                  text={`${info.stats.points}\npoints`}
                />
                <Button
                  style={STYLES.stat_btn}
                  text={`${info.following.length}\nFollowing`}
                />
                <Button
                  style={STYLES.stat_btn}
                  text={`${info.followers.length}\nFollowers`}
                />
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: -20}}>
                <Button
                style={{width: '100%', backgroundColor: Color.buttonColor}}
                text={requested ? "Requested" : (following ? "Unfollow" : "Follow")}
                onPress={() => {
                    this.followUser()
                }}
                disabled={requested}
                />
            </View>
            </View>
          </View>
          <Text multiline={true} style={[STYLES.text,{margin:"4%", marginTop:0}]}>Bio: {info.bio}</Text>

            {/* <View style={{ backgroundColor: Color.darkBackground, height:windowHeight * 0.8}}>
                <AppContainer style={{ flex:1 }}/>
            </View> */}
        </ScrollView>        
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestFollow }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfileScreen);
