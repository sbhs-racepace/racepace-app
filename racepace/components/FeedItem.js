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
  button: {
    fontSize: 20,
    height: '100%',
    width: '40%',
    borderWidth: 0,
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
            source={require('../assets/cat.jpeg')}
            style={STYLES.profilePic}
          />
          <View style={STYLES.user_info}>
            <Text>{this.props.username}</Text>
            <Text>{this.props.posttime}</Text>
          </View>
        </View>

        <View style={{ margin: '3%' }}>
          <Text>{this.props.routename}</Text>
          <Text>Description: {this.props.description}</Text>
          <Text>
            Stats: {this.props.length}km {this.props.time}m
          </Text>
        </View>

        <Image source={require('../assets/cat.jpeg')} style={STYLES.routePic} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            margin: '2%',
          }}>
          <Text>
            {this.state.likes + Number(this.state.liked) + ' '}
            Like{this.state.likes + Number(this.state.liked) != 1 ? 's' : ''}
          </Text>
          <Text>
            {this.state.comments.length + ' '}
            Comment{this.state.comments.length != 1 ? 's' : ''}
          </Text>
        </View>
        {this.state.showComments && (
          <View>
            {this.state.comments.map(comm => (
              <Text>
                {comm.name}:{comm.mess}
              </Text>
            ))}
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={{ width: '80%' }}
                onChangeText={mess => {
                  this.setState({ mess });
                }}
              />
              <Button
                style={{ width: '20%' }}
                text="Send"
                onPress={this.sendComment.bind(this)}
              />
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 40,
            width: '100%',
            backgroundColor: 'rgb(0, 153, 255)',
            borderRadius: 10,
            padding: '3%',
          }}>
          <Button
            text="Like"
            style={STYLES.button}
            onPress={this.like.bind(this)}
          />
          <Text>|</Text>
          <Button
            text="Comment"
            style={STYLES.button}
            onPress={this.comment.bind(this)}
          />
        </View>
      </View>
    );
  }
}
