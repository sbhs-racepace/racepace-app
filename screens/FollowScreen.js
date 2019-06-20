import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet,Image } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const STYLES = StyleSheet.create({
  total_view : {
    padding:"3%", 
    backgroundColor:global.colors.lightBackground
  },
  title : {
    textAlign: "center", 
    fontSize: 30,
    fontFamily:'RobotoCondensed-BoldItalic',
    color: global.colors.primaryColor
  },
  text: {
    color: global.colors.textColor,
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
      <View style={{backgroundColor:global.colors.lightBackground, flex:1}}>
        <Text style={STYLES.title}>Pending Follow Requests</Text>
        <ScrollView contentContainerStyle={global.colors.lightBackground}>
          {this.state.follow_requests.map(name => <FollowRequest name={name}/>)}
        </ScrollView>
      </View>
    )
  }
}

// {/* {this.state.follow_requests.map(name => <FollowRequest name={name}/>)} */}
