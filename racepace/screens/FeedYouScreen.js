import React from 'react';
import { View, Text } from 'react-native';
import FeedRoute from "../components/FeedRoute"
import Button from "../components/Button"

export default class FeedYouScreen extends React.Component {
  render() {
    return (
      <View>
        <Button text="Follow Requests" onPress={() => this.props.navigation.navigate("Follow")}/>
        <FeedRoute 
        routeName="ok"
        postTime="yes"
        length="1"
        time="7"/> 
      </View>
    );
  }
}
