import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Button from './Button';
import request from '../request';
import '../global';

const STYLES = StyleSheet.create({
  feed_item: {
    borderWidth: 1,
    padding: '5%',
    width: '100%',
    backgroundColor: global.colors.lightBackground,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: '3%',
  },
  user_info: {
    flexDirection: 'column',
    margin: '3%',
  },
  user_profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routePic: {
    width: '100%',
  },
  likeCommentButton: {
    width: '40%',
    borderWidth: 0,
  },
  text: {
    color: global.colors.textColor,
  },
  likeCommentCombo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: global.colors.primaryColor,
    borderRadius: 10,
    padding: '1%',
  },
});

export class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      liked: false,
      comments: [{ name: 'Test User', mess: 'Test Message' }],
      showComments: false,
    };
  }

  like() {
    this.setState(prevState => {
      return {
        liked: !prevState.liked,
      };
    });
    request('api/likeRoute', 'POST', { id: this.props.id }, true);
  }

  comment() {
    this.setState({
      showComments: true,
    });
  }

  sendComment() {
    this.setState(prevState => {
      prevState.comments.push({
        name: global.user.full_name,
        mess: this.state.mess,
      });
      return {
        comments: prevState.comments,
      };
    });
  }
  render() {
    return (
      <View style={STYLES.feed_item}>
        <View style={STYLES.user_profile}>
          <Image
            style={STYLES.profilePic}
            source={{
              uri: `${global.serverURL}/api/avatars/${
                global.login_status.user_id
              }.png`,
            }}
          />
          <View style={STYLES.user_info}>
            <Text style={STYLES.text}>{this.props.username}</Text>
            <Text style={STYLES.text}>{this.props.posttime}</Text>
          </View>
        </View>

        <View style={{ margin: '3%' }}>
          <Text style={STYLES.text}>{this.props.routename}</Text>
          <Text style={STYLES.text}>Description: {this.props.description}</Text>
          <Text style={STYLES.text}>
            Stats: {this.props.length}km {this.props.time}m
          </Text>
        </View>

        <Image source={require('../assets/cat.jpeg')} style={STYLES.routePic} />
        <View style={[global.view_styles.rowView, { margin: 10 }]}>
          <Text style={STYLES.text}>0 Likes</Text>
          <Text style={STYLES.text}>0 Comments</Text>
        </View>
        <View style={STYLES.likeCommentCombo}>
          <Button
            text="Like"
            style={STYLES.likeCommentButton}
            onPress={this.like.bind(this)}
          />
          <Button
            text="Comment"
            style={STYLES.likeCommentButton}
            onPress={this.comment.bind(this)}
          />
        </View>
      </View>
    );
  }
}
