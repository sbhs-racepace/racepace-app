import React from 'react';
import { Prompt, display_prompt } from '../components/Prompt';
import { ScrollView, View, Text, Alert, Dimensions } from 'react-native';
import Button from "../components/Button"
import {FeedItem} from "../components/FeedItem"
import "../global.js"

export default class FeedFollowingScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>
    }
    return (
      <View style={{backgroundColor:global.colors.lightBackground}}>
        <ScrollView contentContainerStyle={{backgroundColor:global.colors.lightBackground, }}>
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
          <View style={{height:Dimensions.get('window').height * 0.25, alignItems:'center'}}>
            <Button
              style={global.component_styles.roundedButton}
              text_style={{
                padding: '1%',
                fontSize: 16,
                textAlign:'center'
              }}
              onPress={() => Alert.alert('Not Implemented')}
              text="Refresh"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
