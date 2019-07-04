// Jason Yu

import React from 'react';
import { ScrollView, Text, Alert, KeyboardAvoidingView } from 'react-native';
import Button from '../components/Button';
import { FeedItem } from '../components/FeedItem';
import '../global.js';
import Color from '../constants/Color'

let roundedButton = {
  width: '80%',
  borderRadius: 10,
}

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!global.login_info.token && !global.TEST) {
      return <Text>Please login to see your feed</Text>;
    }
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="position" style={{backgroundColor: Color.darkBackground}}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Color.darkBackground,
          }}>
          <FeedItem
            username="Test User"
            posttime="3 hours ago"
            routename="Test Route"
            description="This is a great route"
            length="2.2"
            time="30"
          />
          <FeedItem
            username="Test User"
            posttime="3 hours ago"
            routename="Test Route"
            description="This is a great route"
            length="2.2"
            time="30"
          />
          <FeedItem
            username="Test User"
            posttime="3 hours ago"
            routename="Test Route"
            description="This is a great route"
            length="2.2"
            time="30"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
