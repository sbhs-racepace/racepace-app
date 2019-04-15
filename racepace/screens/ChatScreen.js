import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Button,
} from 'react-native';
import '../global';

const styles = StyleSheet.create({
  chat_screen: {
    flex: 5,
    backgroundColor: "red",
  },
  message_input_box: {
    flex: 1,
    backgroundColor: "green",
    flexDirection:"row",
  },
  message_input: {
    fontSize: 20,
  },
  message_bubble: {
    color:"white",
    fontSize:20,
    backgroundColor:"blue",
    borderStyle:"solid",
    borderColor: "red",
    padding:"3%",
    margin: "3%",
    textAlign: 'center',
  },
  user_message: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  other_message: {
    flexDirection: 'row',
  },
  submit_button: {
    backgroundColor:"blue",
    color:"purple",
  }
});

class MessageBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  message(text) {
    return (
      <View style={{width:"80%"}}>
        <Text style={styles.message_bubble}>{text}</Text>
      </View>
    );
  }

  userMessage(text) {
    return (
      <View style={styles.user_message}>
        {this.message(text)}
      </View>
    );
  }
  
  otherMessage(text) {
    return (
      <View style={styles.other_message}>
        {this.message(text)}
      </View>
    );
  }

  render() {
    if (this.props.sender == true) {
      message = this.userMessage(this.props.text);
    } else {
      message = this.otherMessage(this.props.text);
    }

    return (
      <View>
        {message}
      </View>
    )
  }
}

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {text:"Hello my name is jason and i come from africa and i am black",sender:true},
        {text:"Hello my name is jason and i come from africa and i am black",sender:false},
        {text:"Hello my name is jason and i come from africa and i am black",sender:true},
        {text:"Hello my name is jason and i come from africa and i am black",sender:false},
        {text:"Hello my name is jason and i come from africa and i am black",sender:true}
      ]
    }
  }

  render() {
    return(

      <View style={{flex: 1}}>
        <View style={styles.chat_screen}>
          <ScrollView>
            {this.state.messages.map(message => <MessageBubble text={message.text} sender={message.sender}/>)}
          </ScrollView>
        </View>
        <View style={styles.message_input_box}>
          <View>
            <TextInput style={styles.message_input} placeholder="Enter a message..." editable={true}/>
          </View>
          <View>
            <Button style={styles.submit_button} title="Submit Message"/>
          </View>
        </View>
      </View>
    )
  }
}