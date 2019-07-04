// Jason Yu

import React from 'react';
import { ScrollView, Text, Alert, KeyboardAvoidingView, View } from 'react-native';
import Button from '../components/Button';
import { FeedItem } from '../components/FeedItem';
import '../global.js';
import request from '../functions/request';
import Color from '../constants/Color';

let roundedButton = {
  width: '80%',
  borderRadius: 10,
}

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
    };
  }

  componentDidMount() {
    
  }

  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>
    }
    else if (!this.state.feed) {
      let feed = request('/get_feed', 'POST', {}, true);
      this.setState({ feed: feed.feed_items });
    }
    else if (!global.TEST && !this.state.feed) {
      return (
        <View>
          <Text>Your feed is empty</Text>
          <Button
            style={{
              ...global.component_styles.roundedButton,
              alignSelf: 'center',
            }}
            text_style={{
              padding: '1%',
              fontSize: 16,
            }}
            onPress={() => {
              let feed = request('/get_feed', 'POST', {}, true);
              this.setState({ feed: feed.feed_items });
            }}
            text="Refresh"
          />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{ backgroundColor: Color.lightBackground }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Color.darkBackground,
          }}>
          {global.TEST && (
            <View>
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
            </View>
          )}
          {this.feed &&
            this.feed.map(item => (
              <FeedItem
                username={item.username}
                posttime={item.route.real_time_route.start_time}
                routename={item.route.real_time_route.name}
                description={item.route.real_time_route.description}
                length={item.route.real_time_route.route.distance}
                likes={item.route.likes.length}
                comments={item.route.comments}
                routePic={item.route_image}
              />
            ))}
          <Button
            style={{
              ...global.component_styles.roundedButton,
              alignSelf: 'center',
            }}
            text_style={{
              padding: '1%',
              fontSize: 16,
            }}
            onPress={() => {
              let feed = request('/get_feed', 'POST', {}, true);
              this.setState({ feed: feed.feed_items });
            }}
            text="Refresh"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
