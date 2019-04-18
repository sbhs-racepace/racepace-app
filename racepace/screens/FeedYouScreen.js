import React from 'react';
import { View, Text } from 'react-native';
import FeedItem from "../components/FeedItem"
import Button from "../components/Button"

export default class FeedYouScreen extends React.Component {
  render() {
    return (
      <View>
        <Button text="Follow Requests" onPress={() => this.props.navigation.navigate("Follow")}/>
        <Text>
          Notifications
        </Text>
        <Text>
          Runs
        </Text>
      </View>
    );
  }
}
