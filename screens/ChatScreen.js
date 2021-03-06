// Abdur Raqeeb

import '../global';
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import SlackMessage from '../components/SlackMessage';
import emojiUtils from 'emoji-utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);

    this._storeMessages = this._storeMessages.bind(this);
    this.socket = this.props.user.socket
    this.socket.on('global_message', this.onReceivedMessage);
    this.socket.on('connect', this.onConnect)
  }


  async componentWillMount() {
    let messagesURL = global.serverURL + '/api/groups/global/messages?before=' + (new Date()).toUTCString()
    await fetch(messagesURL, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.props.user.token,
      })
    })
    .then(async res => await res.json())
    .then(data => { 
      let messages = []
      for (let msg of data) {
        messages.push({
          _id: msg._id,
          createdAt: new Date(msg.created_at*1000),
          text: msg.content,
          user: {
            _id: msg.author._id,
            name: msg.author.username,
            avatar: `${global.serverURL}/api/avatars/${msg.author._id}.png`
          }
        });
      }
      this.setState((previousState) => {
        return {
         messages: GiftedChat.prepend(previousState.messages, messages),
        };
      });
    });
  }

  onReceivedMessage(data) {

    let msg = {
        _id: data._id,
        createdAt: new Date(data.created_at*1000),
        text: data.content,
        user: {
            _id: data.author._id,
            name: data.author.username,
            avatar: `${global.serverURL}/api/avatars/${data.author._id}.png`
        }
    }

    this._storeMessages([msg]);
  }

  onSend(messages = []) {

    msg = messages[0]

    payload = {
        group_id: 'global',
        content: msg.text,
        author: {
          _id: this.props.user.user_id,
          username: this.props.user.username,
          full_name: this.props.user.full_name,
          avatar_url: `${global.serverURL}/api/avatars/${this.props.user.user_id}.png`,
        },
        image: `${global.serverURL}/api/avatars/${this.props.user.user_id}.png`
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

  renderMessage(props) {

    const { currentMessage: { text: currText } } = props;

    let messageTextStyle;

    // Make "pure emoji" messages much bigger than plain text.
    if (currText && emojiUtils.isPureEmojiString(currText)) {
      messageTextStyle = {
        fontSize: 28,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30,
      };
    }

    return (
      <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.user.user_id,
          avatar: `${global.serverURL}/api/avatars/${this.props.user_id}.png`,
          name: this.props.user.username
        }}
        renderMessage={this.renderMessage}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        renderAvatarOnTop={true}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);