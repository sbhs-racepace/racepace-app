import '../global';
import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import SlackMessage from '../components/SlackMessage';
import emojiUtils from 'emoji-utils';

export default class ChatScreenTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);

    this._storeMessages = this._storeMessages.bind(this);

    this.socket = global.socket;
    this.socket.on('global_message', this.onReceivedMessage);
    this.socket.on('connect', this.onConnect)
  }

  static transformMessage(data) {
      return {
        _id: data._id,
        createdAt: new Date(data.created_at*1000),
        text: data.content,
        user: {
            _id: data.author.id,
            name: data.author.username,
            avatar: data.author.avatar_url
        }
    }
  }

  componentWillMount() {
    let messagesURL = global.serverURL + '/api/groups/global/messages?before=' + (new Date()).toUTCString()
    fetch(messagesURL, {
        method: 'GET',
        headers: new Headers({
          'Authorization': global.login_status.token,
        })
      }).then(res => res.json()).then(data => { 
            console.log(data)
            let messages = []
            for (let msg of data) {
                console.log(msg.created_at)
                messages.push({
                    _id: msg._id,
                    createdAt: new Date(msg.created_at*1000),
                    text: msg.content,
                    user: {
                        _id: msg.author.id,
                        name: msg.author.username,
                        avatar: msg.author.avatar_url
                    }
                })
            }
            this.setState((previousState) => {
                return {
                 messages: GiftedChat.prepend(previousState.messages, messages),
                };
              });
        });
    }

  onReceivedMessage(data) {

    let msg = this.transformMessage(data)
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
          _id: global.login_status.user_id,
          avatar: `${global.serverURL}/api/avatars/${global.login_status.user_id}.png`,
          name: global.user.username
        }}
        renderMessage={this.renderMessage}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
      />
    );
  }
}