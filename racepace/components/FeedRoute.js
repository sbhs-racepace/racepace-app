import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from "./Button"

const STYLES = StyleSheet.create({
	feed_item : {
		borderWidth:1,
		padding: "5%",
		width:"80%"
	},
  routeName: {
    fontSize: 20
  }
  
})

export default class FeedRoute extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View style={STYLES.feed_item}>
      	<Text style={STYLES.routeName}>{this.props.routeName}</Text>
        <Text>{this.props.postTime}</Text>
      	<Text>Stats: {this.props.length}km {this.props.time}m</Text>
			</View>
		)
	}
}