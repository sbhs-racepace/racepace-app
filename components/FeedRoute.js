import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from "./Button"
import Color from '../constants/Color'
import '../global'

const STYLES = StyleSheet.create({
	feed_item : {
		borderWidth:1,
		padding: "5%",
		width:"100%",
	},
  routeName: {
    fontSize: 20
	},
	text: {
		color:Color.textColor
	}
})

export default class FeedRoute extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View style={STYLES.feed_item}>
      	<Text style={[STYLES.routeName,STYLES.text]}>{this.props.routeName}</Text>
        <Text style={STYLES.text}>{this.props.postTime}</Text>
      	<Text style={STYLES.text}>Stats: {this.props.length}km {this.props.time}m</Text>
			</View>
		)
	}
}