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
    this.feed = request(global.serverURL+"/get_feed", "POST", {}, true)
    
  }

  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>;
    }
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="position">
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
          <View
            style={{
              height: Dimensions.get('window').height * 0.3,
              alignItems: 'center',
            }}>
            <Button
              style={global.component_styles.roundedButton}
              text_style={{
                padding: '1%',
                fontSize: 16,
                textAlign: 'center',
              }}
              onPress={() => Alert.alert('Not Implemented')}
              text="Refresh"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
