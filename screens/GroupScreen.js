// Sunny Yan, Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Button from "../components/Button"
import Color from '../constants/Color'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const STYLES = StyleSheet.create({
  group: {
    height:80,
    margin:5,
    width:"90%",
  },
  text: {
    color: Color.textColor,  
    fontSize:20,
  },
  circularButton:{
    margin:5,
    borderWidth:1,
    backgroundColor:Color.darkBackground,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  smallButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  smallIcon: 20,
})

class Group extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button 
        style={STYLES.group}
        onPress={() => {this.props.onPress()}}
      >
        <View style={{height:'100%', justifyContent:'space-evenly'}}>
          <Text style={STYLES.text}>{this.props.group.group_name}</Text>
          <Text style={STYLES.text}>Description: {this.props.group.description}</Text>
        </View>
      </Button>
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
        <View style={{flex:1}}>
          <Button
            style={{ alignSelf: 'center', width:'100%', height:60}}
            text="Find Friends"
            onPress={() => this.props.navigation.navigate('FindFriends')}
          >
            <FontAwesomeIcon name="search" size={STYLES.smallIcon} color={Color.primaryColor}/>
          </Button>
        </View>
        <View style={{flex:5, alignItems:'center'}}>
          <Text style={{fontFamily:'Roboto-Bold',fontSize:40,padding:"3%",color:Color.primaryColor}}>Running Groups</Text>
          <Text style={STYLES.text}>Groups are not fully implemented yet</Text>
          <ScrollView>
            {this.state.groups.map(group => <Group onPress={() => {this.props.navigation.navigate('Chat')}} group={group}></Group>)}
          </ScrollView>
        </View>

      </View>
    );
  }
}
