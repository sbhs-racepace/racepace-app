import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Button from "../components/Button"
import "../global.js"
import RecommendedFollow from "../components/RecommendedFollow";
import FollowRequest from "../components/FollowRequest";

const STYLES = StyleSheet.create({
  follow_requests : {
    flex:1, padding:"3%", backgroundColor:"rgb(250,250,250)"
  },
  recommended_follows: {
    flex:2, padding:"3%"
  },
});

export default class FollowScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follow_requests : ['Jamie','George','Josh']
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={STYLES.follow_requests}>
          <Text>Pending Follow Requests</Text>
          <ScrollView>
            {this.state.follow_requests.map(name => <FollowRequest name={name}/>)}
          </ScrollView>
        </View>

        <View style={STYLES.recommended_follows}>
          <Text style={{alignContent:"center"}}>Suggested for You</Text>
          <ScrollView>
            {this.state.follow_requests.map(name => <RecommendedFollow name={name}/>)}
          </ScrollView>
        </View>
      </View>
    )
  }
}
