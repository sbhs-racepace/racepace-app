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
      <View style={{flexDirection:"row"}}>
        <Text>{this.props.name} wants to follow you!</Text>
        <Button text="Follow"/>
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
      <View>
        <Button text="Notifications"/>
        {this.state.follow_requests.map(name => <FollowRequest name={name}/>)}
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
