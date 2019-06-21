import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet,Image } from 'react-native';
import Button from "../components/Button"
import BackButtonHeader from '../components/BackButtonHeader'
import "../global.js"
import Color from '../constants/Color'

const STYLES = StyleSheet.create({
  total_view : {
    padding:"3%", 
    backgroundColor:Color.lightBackground
  },
  text: {
    color: Color.textColor,
  },
  profile_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{width:'100%',alignItems:'center',flex:1, flexDirection:'row', padding:'3%'}}>
        <View style={{flex:1,flexDirection:'column'}}>
          <Image
              style={STYLES.profile_image}
              source={{uri: `${global.serverURL}/api/avatars/${global.login_status.user_id}.png`}}
            />
          </View>
        <View style={{flex:2,flexDirection:'column', justifyItems:'center'}}>
          <Text style={STYLES.text}>{this.props.name} wants to follow you!</Text>
          <Button 
            style={global.component_styles.roundedButton} 
            text="Accept Request"
          />
        </View>
      </View>
    )
  }
}

export default class FollowScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow_requests : ['Jamie','George','Josh'],
    }
  }

  render() {
    return (
      <View style={{backgroundColor:Color.lightBackground, flex:1}}>
        <BackButtonHeader
          title='Follow'
          onPress={this.props.navigation.goBack}
        />
        <ScrollView contentContainerStyle={Color.lightBackground}>
          {this.state.follow_requests.map(name => <FollowRequest name={name}/>)}
        </ScrollView>
      </View>
    )
  }
}

// {/* {this.state.follow_requests.map(name => <FollowRequest name={name}/>)} */}
