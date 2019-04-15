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
import '../global';

const styles = StyleSheet.create({
  chat_screen: {
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
  message_container: {
    fontSize:20,
    padding:"3%",
    margin: "3%",
    borderRadius:20,
  },
  user_message: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  other_message: {
    flexDirection: 'row',
  }
});

class MessageBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message_style = this.props.sender ? styles.user_message : styles.other_message;
    let message_color = this.props.sender ? {backgroundColor:"rgb(0, 153, 255)"} : {backgroundColor:"rgb(215,215,215)"};
    let text = this.props.sender ? {color:"white",textAlign:"right"} : {color:"black",textAlign:"left"};
    return (
      <View style={message_style}>
        <View style={[styles.message_container,message_color]}>
         <Text style={text}>{this.props.text}</Text>
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
      ],
      current_text: "test",
    }
  }

  enterMessage() {
    alert(this.state.current_text)
    this.state.messages.push(this.state.current_text);
    this.state.current_text = "";
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
          <TextInput 
            style={styles.message_input} 
            placeholder="Enter a message..." 
            onChangeText={(current_text) => this.setState({current_text})}
            editable={true}
            multiline={true}
            clearButtonMode='always'
          />
          <TouchableOpacity
              onPress = {
                () => this.enterMessage()
              }>
              <Text> Submit </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}