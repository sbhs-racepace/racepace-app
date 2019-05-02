import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from "../components/Button"
import "../global"

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
      <View>
        {this.state.groups.map(group => <Group group={group}></Group>)}
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
      name: {
        fontSize:16,
        fontWeight:"bold"
      },
      border: {
        borderWidth:1,
        paddingLeft:"3%",
        padding:"2% 3%",
        marginTop:5,
        marginLeft:"2%",
        width:"96%",
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
        <Text style={STYLES.name}>{this.props.group.group_name}</Text>
        <Text>Members: {members_str}</Text>
        <Text>Description: {this.props.group.description}</Text>
        <Text>Last Message: {last_mess}</Text>
      </TouchableOpacity>
    )
  }

}
