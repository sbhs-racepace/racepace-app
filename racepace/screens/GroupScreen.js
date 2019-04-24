import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from "../components/Button"

export default class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          group_name: "Running Group 1",
          members: ["a", "b", "c"],
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
        padding:"3%",
        marginTop:5,
        marginLeft:"2%",
        width:"96%",
      }
    })
    return (
      <TouchableOpacity style={STYLES.border}>
        <Text style={STYLES.name}>{this.props.group.group_name}</Text>
        <Text>Group Length: {this.props.group.members.length}</Text>
        <Text>Description: {this.props.group.description}</Text>
        <View>{this.props.group.members.map(member => <Text>{member}</Text>)}</View>
      </TouchableOpacity>
    )
  }

}
