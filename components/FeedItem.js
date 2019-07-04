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
import request from '../functions/request';
import '../global';
import Color from '../constants/Color';

const STYLES = StyleSheet.create({
  feed_item: {
    borderWidth: 1,
    padding: '5%',
    width: '100%',
    backgroundColor: Color.lightBackground,
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
    color: Color.textColor,
  },
  likeCommentCombo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Color.primaryColor,
    borderRadius: 10,
    padding: '1%',
  },
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>{this.props.name}:</Text>
        <Text> {this.props.comment}</Text>
      </View>
    );
  }
}

export class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes || [],
      liked: false,
      comments: this.props.comments || [],
      commentInput: '',
      showComments: false,
    };
  }

  like() {
    this.setState(prevState => {
      return {
        liked: !prevState.liked,
        likes: this.props.likes + !prevState.liked,
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
      prevState.comments.push([global.user.full_name, this.state.commentInput]);
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
          <Text style={STYLES.text}>Length: {this.props.length}km</Text>
        </View>

        <Image source={{ uri: this.props.routePic }} style={STYLES.routePic} />
        <View style={[global.view_styles.rowView, { marginBottom: 5 }]}>
          <Text style={STYLES.text}>{this.state.likes.length} Likes</Text>
          <Text style={STYLES.text}>{this.state.comments.length} Comments</Text>
        </View>
        {this.state.showComments && (
          <View>
            {this.state.comments.map(comment => (
              <Comment name={comment[0]} comment={comment[1]} />
            ))}
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
              <TextInput
                placeholder="Enter a comment here..."
                placeholderTextColor={Color.textColor}
                style={{
                  width: '90%',
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 1,
                  fontSize: 20,
                }}
                onChangeText={text => this.setState({ commentInput: text })}
              />
              <Button
                style={{ height: 30, width: 30, borderRadius: 15, marginLeft: 5 }}
                onPress={this.sendComment.bind(this)}
              />
            </View>
          </View>
        )}
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
