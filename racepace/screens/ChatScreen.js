import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Button from '../components/Button.js'
import '../global';

const STYLES = StyleSheet.create({
  chat_input :{
    marginTop : 5,
    paddingLeft : 3,
    borderWidth : 2,
    width : "90%",
    height : "10%",
    right : "10%",
  }
})

export default class ChatScreen extends React.Component {
  render() {
    return(
      <View>
        <ScrollView>
                  
        </ScrollView>
        <TextInput
        style = {STYLES.chat_input}
        placeholder = "Type a Message..."
        />

        <Button />
      
      </View>
    )
  }
}
