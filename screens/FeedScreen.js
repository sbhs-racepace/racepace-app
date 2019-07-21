// Jason Yu
//TODO: Fix update
import React from 'react';
import {
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import Button from '../components/Button';
import FeedItem from '../components/FeedItem';
import '../global.js';
import request from '../functions/request';
import Color from '../constants/Color';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      reload: true
    };
  }

  generateFeed() {
    let feed = this.state.feed.map(item => {
      return (
        <FeedItem
          userid={item.user_id}
          username={item.user_name}
          posttime={item.route.start_time}
          routename={item.route.description}
          length={item.route.estimated_distance}
          likes={item.route.likes.length}
          comments={item.route.comments}
        />
      );
    });
    return feed
  }

  render() {
    if (!this.props.user.token == null) {
      return <Text>Please login to see your feed</Text>;
    } else if (this.state.reload) {
      request('/api/get_feed', 'POST', {}, this.props.user.token, feed => {
        this.setState({ feed: feed.feed_items, reload: false });
      });
      this.load = false
      return (
        <Text style={{
          backgroundColor: Color.darkBackground,
          color:Color.textColor,
          flex:1
        }}>
        Loading...
        </Text>
      );
    }

    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{ backgroundColor: Color.darkBackground }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Color.darkBackground,
            alignItems: "center",
            height:"100%"
          }}>
          {this.generateFeed()}
          {this.state.feed.length == 0 && <Text style={{color:Color.textColor}}>Your feed is empty</Text>}
          <Button
            style={{
              width: '80%',
              alignSelf: 'center',
            }}
            text_style={{
              padding: '1%',
              fontSize: 16,
            }}
            onPress={() => {
              this.setState({reload:true})
            }}
            text="Refresh"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedScreen);
