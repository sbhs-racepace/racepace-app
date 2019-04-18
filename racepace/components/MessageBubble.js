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

const STYLES = StyleSheet.create({
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


export default class MessageBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message_style = this.props.sender ? STYLES.user_message : STYLES.other_message;
    let message_color = this.props.sender ? {backgroundColor:"rgb(0, 153, 255)"} : {backgroundColor:"rgb(215,215,215)"};
    let text = this.props.sender ? {color:"white",textAlign:"right"} : {color:"black",textAlign:"left"};
    return (
      <View style={message_style}>
        <View style={[STYLES.message_container,message_color]}>
         <Text style={text}>{this.props.text}</Text>
       </View>
      </View>
    )
  }
}