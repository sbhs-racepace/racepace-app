import React from 'react';
import { View, Text } from 'react-native';
import FeedItem from "../components/FeedItem"

export default class FeedScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Feed</Text>
        <Text>Following | You</Text>
      </View>
    );
  }
}
