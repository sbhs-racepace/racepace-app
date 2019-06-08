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
  TouchableOpacity,
} from 'react-native';
import MessageBubble from "../components/MessageBubble"
import '../global';

const STYLES = StyleSheet.create({
  message_screen: {
    flex: 7,
  },
  message_input_box: {
    borderStyle:"solid",
    borderWidth:1,
    borderColor:"black",
    padding:"6%",
    flex: 1,
    flexDirection:"column",
  },
  message_input: {
    fontSize: 20,
  },
});

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {text:"VO2 max (also maximal oxygen consumption, maximal oxygen uptake, peak oxygen uptake or maximal aerobic capacity) is the maximum rate of oxygen consumption measured during incremental exercise; that is, exercise of increasing intensity.",sender:true},
        {text:"Accurately measuring VO2 max involves a physical effort sufficient in duration and intensity to fully tax the aerobic energy system.",sender:'a'},
        {text:"VO2 max is reached when oxygen consumption remains at a steady state despite an increase in workload.",sender:true},
        {text:"Cool Right?",sender:true},
        {text:"yeah very cool",sender:'b'},
        {text:"indeed",sender:true},
      ],
      current_text: "test",
    }
  }

  enterMessage() {
    alert(this.state.current_text)
    this.state.messages.push(this.state.current_text);
    this.state.current_text = "";
  }

  getMessages() {
    let samePreviousMessage = false;
    let messages = [];
    for (let i=0;i<this.state.messages.length;i++) {
      Alert.alert(i);
      let message = this.state.messages[i].sender
      if (i == 0) {
        samePreviousMessage = false;
      } else {
        samePreviousMessage = message.sender == this.state.messages[i-1].sender;
      }
      messages.push(<MessageBubble style={{margin:"5%"}} samePreviousMessage={samePreviousMessage} text={"afsd"} sender={message.sender}/>)
    }
    return messages;
  }

  checkSameSender(sender,index) {
    if (index == 0) {
      return false;
    } else if (sender == this.state.messages[index-1].sender) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(

      <View style={{flex: 1}}>
        <View style={STYLES.message_screen}>
          <ScrollView 
          scrollEnabled={true}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: false});}}
          >
            {this.state.messages.map((message,index) => <MessageBubble style={{margin:"5%"}} sameSender={this.checkSameSender(message.sender,index)} text={message.text} sender={message.sender}/>)}
          </ScrollView>
        </View>
        <View style={STYLES.message_input_box}>
          <TextInput 
            style={STYLES.message_input} 
            placeholder="Enter a message..." 
            onChangeText={(current_text) => this.setState({current_text})}
            editable={true}
            multiline={true}
            clearButtonMode='always'
          />
          {/* <TouchableOpacity
              onPress = {
                () => this.enterMessage()
              }>
              <Text> Submit </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }
}