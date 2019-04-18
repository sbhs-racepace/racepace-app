import React from 'react';
import { Prompt, display_prompt } from '../components/Prompt';
import { ScrollView, View, Text, Alert } from 'react-native';
import Button from "../components/Button"
import {FeedItem} from "../components/FeedItem"
import "../global.js"

export default class FeedFollowingScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <FeedItem
          username="Test User"
          posttime="3 hours ago"
          routename="Test Route"
          description="This is a great route"
          length="2.2"
          time="30"
        />
      </ScrollView>
    );
  }
}
