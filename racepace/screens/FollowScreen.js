import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const STYLES = StyleSheet.create({
  follow_requests : {
    flex:1, padding:"3%", backgroundColor:"rgb(250,250,250)"
  },
  recommended_follows: {
    flex:2, padding:"3%"
  },  
  recommended_follow_view: {
    flex: 1, margin:"5%", flexDirection:"row"
  },
  recommended_follow_text: {
    flex:2
  },
  recommended_follow_button: {
    flex:1 ,borderRadius:10
  }
});

class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLES.follow_request_view}>
        <Text style={STYLES.follow_request_text}>{this.props.name} wants to follow you!</Text>
        <Button 
          style={STYLES.follow_request_button} 
          text="Accept Request"/>
      </View>
    )
  }
}

class RecommendedFollow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLES.recommended_follow_view}>
        <Text style={STYLES.recommended_follow_text}>{this.props.name}</Text>
        <Button 
          style={STYLES.recommended_follow_button} 
          text="Follow"
        />
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
        <View style={STYLES.follow_requests}>
          <Text style={{'textAlign': "center", "fontSize": 20}}>Pending Follow Requests</Text>
          <ScrollView style={{flex:1}}>
            {this.state.follow_requests.map(name => <FollowRequest name={name}/>)}
          </ScrollView>
        </View>
    )
  }
}
