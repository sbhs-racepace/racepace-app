import React from 'react';
import { Prompt, display_prompt } from '../components/Prompt';
import {
  ScrollView,
  View,
  Text,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Button from '../components/Button';
import { FeedItem } from '../components/FeedItem';
import '../global.js';
import request from "../functions/request"
import Color from '../constants/Color'

export default class FeedFollowingScreen extends React.Component {
  constructor(state) {
    super(state);
  }

  componentDidMount() {
    if (!global.login_status.success) {
      this.feed = request(global.serverURL+"/get_feed", "POST", {}, true)
    }
  }

  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>;
    }
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="position" style={{backgroundColor: Color.lightBackground}}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Color.lightBackground,
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
            style={{...global.component_styles.roundedButton, alignSelf:'center'}}
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
