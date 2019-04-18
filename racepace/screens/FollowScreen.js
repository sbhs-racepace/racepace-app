import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import Button from "../components/Button"
import "../global.js"


class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, margin:"5%", flexDirection:"row"}}>
        <Text style={{flex:2}}>{this.props.name} wants to follow you!</Text>
        <Button style={{flex:1 ,borderRadius:10}} text="Accept Request"/>
      </View>
    )
  }
}

class Follow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, margin:"5%", flexDirection:"row"}}>
        <Text style={{flex:2}}>{this.props.name}</Text>
        <Button style={{flex:1 ,borderRadius:10}} text="Follow"/>
      </View>
    )
  }
}

class NotificationDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow_requests : ['Jamie','George','Josh']
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1, padding:"3%", backgroundColor:"rgb(250,250,250)"}}>
          <Text>Pending Follow Requests</Text>
          <ScrollView>
            {this.state.follow_requests.map(name => <FollowRequest name={name}/>)}
          </ScrollView>
        </View>

        <View style={{flex:2, padding:"3%"}}>
          <Text style={{alignContent:"center"}}>Suggested for You</Text>
          <ScrollView>
            {this.state.follow_requests.map(name => <Follow name={name}/>)}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default class FollowScreen extends React.Component {
  render() {
    return (
      <NotificationDropDown/>
    );
  }
}
