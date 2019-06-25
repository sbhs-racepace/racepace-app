// Sunny Yan, Jason Yu

import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from "../components/Button"
import "../global"
import Color from '../constants/Color'

export default class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          group_name: "Running Group 1",
          members: ["P Longname", "T Shortname", "R Testname"],
          description: "abcdefg this is cool",
          messages: [
          {
            author:"a",
            message:"Hello there"
          },
          {
            author:"b",
            message:"Hello a"
          },
          {
            author:"c",
            message:"Hello b"
          }
          ]
        },
        {
          group_name: "Running Group 2",
          members: ["d", "e", "f"],
          description: "abcdefg this is cool",
          messages: [
          {
            author:"d",
            message:"Hello there"
          },
          {
            author:"e",
            message:"Hello d"
          },
          {
            author:"f",
            message:"Hello f"
          }
          ]
        },
      ]
    }
  }

  render() {
    if (!global.login_status.success && !global.TEST) {
      return <View><Text>Please login to see your groups</Text><Button text="Tracking" onPress={()=>this.props.navigation.navigate("Track")} /></View>
    }
    return (
      <View style={{flex:1, backgroundColor:Color.lightBackground}}>
        <Text style={{fontFamily:'RobotoCondensed-BoldItalic',fontSize:40,padding:"3%",color:Color.primaryColor}}>Running Groups</Text>
        <View style={{flex:9}}>
          {this.state.groups.map(group => <Group group={group}></Group>)}
        </View>
        <Button style={{width:"100%"}} text="Tracking" onPress={()=>this.props.navigation.navigate("Track")} />
      </View>
    );
  }
}

class Group extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
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

    let members_str = ""
    let i = 0
    while (members_str.length < 24 && i<this.props.group.members.length) {
      members_str += this.props.group.members[i] + ", "
      i++
    }
    members_str = members_str.slice(0,members_str.length-2)
    if (i<this.props.group.members.length) {
      members_str += ` + ${this.props.group.members.length-i} more`
    }

    let last_mess = `[${this.props.group.messages[0].author}] ${this.props.group.messages[0].message}`
    if (last_mess.length > 32) {
      last_mess = last_mess.slice(0,32) + "..."
    }

    return (
      <TouchableOpacity style={STYLES.border}>
        <Text style={[STYLES.text,{fontSize:16}]}>{this.props.group.group_name}</Text>
        <Text style={STYLES.text}>Members: {members_str}</Text>
        <Text style={STYLES.text}>Description: {this.props.group.description}</Text>
        <Text style={STYLES.text}>Last Message: {last_mess}</Text>
      </TouchableOpacity>
    )
  }

}
