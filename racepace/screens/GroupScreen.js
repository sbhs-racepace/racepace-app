import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from "../components/Button"
import "../assets/messages"

export default class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          group_name: "Running Group 1",
          members: ["a", "b", "c"],
          discription: "abcdefg this is cool",
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
          discription: "abcdefg this is cool",
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
    return (
      <TouchableOpacity style={{borderWidth:1,padding:"3%"}}>
        <Text>Group Name: {this.props.group.group_name}</Text>
        <Text>Group Length: {this.props.group.members.length}</Text>
        <Text>Discription: {this.props.group.discription}</Text>
        <View>{this.props.group.members.map(member => <Text>{member}</Text>)}</View>
      </TouchableOpacity>
    )
  }

}