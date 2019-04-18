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
  user_message: {
    flexDirection: 'row-reverse',
  },
  other_message: {
    flexDirection: 'row',
  },
  message_text: {
    fontSize:20,
    padding:"3%",
  }
});


export default class MessageBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message_style = (this.props.sender==true) ? STYLES.user_message : STYLES.other_message;
    let other_style = (this.props.sender==true) ? STYLES.other_message : STYLES.user_message;
    let message_color = (this.props.sender==true) ? {backgroundColor:"rgb(0, 153, 255)"} : {backgroundColor:"rgb(215,215,215)"};
    let profileImage, profileName;
    if (this.props.sameSender) {
      profileImage = (<Image style={{width:16,height:16,borderRadius:8, margin:1}}/>);
      profileName = null
    } else {
      profileImage = (<Image source={require('../assets/cat.jpeg')} style={{width:16,height:16,borderRadius:8, margin:1}}/>);
      profileName = (
        <View style={message_style}>
          <Text style={{fontSize:8}}>Sender Name</Text>
        </View>
      )
    }
    return (
      <View>
        <View style={[message_style,{margin:5,alignItems:"center"}]}>
          {profileImage}
          <View style={{flexDirection:"column", flex:1, maxWidth:"70%"}}>
            {profileName}
            <View style={[message_color,{borderRadius:20}]}>
              <Text style={STYLES.message_text}>{this.props.text}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}