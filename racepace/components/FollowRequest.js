import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Button from "../components/Button"

const STYLES = StyleSheet.create({
  follow_request_button : {flex:1 ,borderRadius:10},
  follow_request_text: {flex:2},
  follow_request_view : {flex: 1, margin:"5%", flexDirection:"row"}
});

export default class FollowRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLES.follow_request_view}>
        <Text style={STYLES.follow_request_text}>{this.props.name} wants to follow you!</Text>
        <Button style={STYLES.follow_request_button} text="Accept Request"/>
      </View>
    )
  }
}