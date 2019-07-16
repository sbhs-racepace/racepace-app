// Jason Yu
//TODO: Fix update
import React from 'react';
import { ScrollView, Text, Alert, KeyboardAvoidingView, View } from 'react-native';
import Button from '../components/Button';
import { FeedItem } from '../components/FeedItem';
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
    };
  }

  generateFeed() {
    return this.state.feed.map(item =>
        {return (<FeedItem
          username={item.user_name}
          posttime={item.route.start_time}
          routename={item.route.description}
          length={item.route.estimated_distance}
          likes={item.route.likes.length}
          comments={item.route.comments}
        />)}
      )
  }

  render() {
    if (!this.props.user.token == null) {
      return <Text>Please login to see your feed</Text>
    } else if (this.state.feed===[]) {
      console.log("Generate feed")
      request('/api/get_feed', 'POST', {}, this.props.user.token,
      feed => {this.setState({ feed: feed.feed_items })})
      return <View
        style={{
          backgroundColor: Color.darkBackground,
        }}>
        <Text>Loading...</Text>
        </View>
    }
    console.log("Render feed")
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={{ backgroundColor: Color.darkBackground }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Color.darkBackground,
          }}>
          {this.generateFeed()}
          {!this.state.feed===[] && <Text>Your feed is empty</Text>}
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
              this.setState({feed: null});
            }}
            text="Refresh"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
