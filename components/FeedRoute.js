// Jason Yu

import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Button from "./Button"
import Color from '../constants/Color'

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
      	<Text style={[STYLES.routeName,STYLES.text]}>{this.props.from} to {this.props.to}</Text>
        <Text style={STYLES.text}>{this.props.postTime}</Text>
      	<Text style={STYLES.text}>Stats: {this.props.length}km</Text>
			</View>
		)
	}
}