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
  constructor(state) {
    super(state);
  }
  render() {
    if (!global.login_info.token && !global.TEST) {
      return <Text>Please login to see your feed</Text>;
    }
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="position" style={{backgroundColor: Color.lightBackground}}>
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
          <Button
            style={{...roundedButton, alignSelf:'center'}}
            text_style={{
              padding: '1%',
              fontSize: 16,
            }}
            onPress={() => Alert.alert('Not Implemented')}
            text="Refresh"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
