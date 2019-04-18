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
        <View style={STYLES.message_screen}>
          <ScrollView 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: false});}}
          >
            {this.state.messages.map(message => <MessageBubble text={message.text} sender={message.sender}/>)}
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