import '../global';
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, AsyncStorage } from 'react-native';

const USER_ID = '@userId';

export default class ChatScreenTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: global.login_status.user_id
    };
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = global.socket;
    this.socket.on('global_message', this.onReceivedMessage);
    this.socket.on('connect', this.onConnect)
  }

  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit('userJoined', null);
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId);
            this.setState({ userId });
          });
        } else {
          this.socket.emit('userJoined', userId);
          this.setState({ userId });
        }
      })
      .catch((e) => alert(e));
  }

  onReceivedMessage(data) {

    msg = {
        _id: data._id,
        createdAt: data.created_at,
        text: data.content,
        user: {
            _id: data.author.id,
            userName: data.author.username,
            avatarUrl: data.author.avatar_url
        }
    }

    this._storeMessages([msg]);
  }

  onSend(messages = []) {

    msg = messages[0]

    payload = {
        group_id: 'global',
        content: msg.text,
        image: null
    }

    this.socket.emit('global_message', payload);
    this._storeMessages(messages);
  }

  // Helper function that updates messages in chat
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
       messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
      />
    );
  }
}