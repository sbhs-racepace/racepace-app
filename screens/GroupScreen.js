// Sunny Yan, Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Button from "../components/Button"
import Color from '../constants/Color'

const STYLES = StyleSheet.create({
  border: {
    borderWidth:1,
    paddingLeft:"3%",
    padding:"2% 3%",
    marginTop:5,
    marginLeft:"2%",
    width:"96%",
  },
  text: {
    color: Color.textColor,
  }
})

class Group extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity 
        style={STYLES.border}
        onPress={() => {this.props.onPress()}}
      >
        <Text style={[STYLES.text,{fontSize:16}]}>{this.props.group.group_name}</Text>
        <Text style={STYLES.text}>Description: {this.props.group.description}</Text>
      </TouchableOpacity>
    )
  }
}

export default class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          group_name: "Running Group 1",
          description: "abcdefg this is cool",
        },
        {
          group_name: "Running Group 2",
          description: "abcdefg this is cool",
        },
      ]
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:Color.lightBackground}}>
        <Text style={{fontFamily:'Roboto-Bold',fontSize:40,padding:"3%",color:Color.primaryColor}}>Running Groups</Text>

        <ScrollView>
          {this.state.groups.map(group => <Group onPress={() => {this.props.navigation.navigate('Chat')}} group={group}></Group>)}
        </ScrollView>
        <Button
          style={{ alignSelf: 'center' }}
          text="Find Friends"
          onPress={() => this.props.navigation.navigate('FindFriends')}
        />

      </View>
    );
  }
}
