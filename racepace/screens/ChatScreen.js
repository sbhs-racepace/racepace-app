import React from "react";
import {
  ScrollView,
  FlatList,
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
  },
  message_input_box: {
    flex: 1,
    backgroundColor: "rgb(224,224,224)",
    flexDirection:"row",
  },
  message_input: {
    fontSize: 20,
  },
  message_text: {
    color:"white",
    fontSize:20,
    backgroundColor:"rgb(0,102,204)",
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

  render() {
    let message_style = this.props.sender ? styles.user_message : styles.other_message;
    return (
      <View style={message_style}>
        <View style={{width:"80%"}}>
         <Text style={styles.message_text}>{this.props.text}</Text>
       </View>
      </View>
    )
  }
}

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {text:"VO2 max (also maximal oxygen consumption, maximal oxygen uptake, peak oxygen uptake or maximal aerobic capacity) is the maximum rate of oxygen consumption measured during incremental exercise; that is, exercise of increasing intensity.",sender:true},
        {text:"Accurately measuring VO2 max involves a physical effort sufficient in duration and intensity to fully tax the aerobic energy system.",sender:false},
        {text:"VO2 max is reached when oxygen consumption remains at a steady state despite an increase in workload.",sender:true},
        {text:"Cool",sender:false},
        {text:"Nice",sender:true},
      ]
    }
  }

  render() {
    return(

      <View style={{flex: 1}}>
        <View style={styles.chat_screen}>

          <ScrollView 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: false});}}
          >
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