// Jason Yu

import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import Button from "./Button"
import Color from '../constants/Color'

const STYLES = StyleSheet.create({
	box : {
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

export default class RunItem extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View style={STYLES.box}>
        <Text style={STYLES.text}>Start Time: {this.props.start_time}</Text>
      	<Text style={STYLES.text}>Distance: {this.props.length}km</Text>
			</View>
		)
	}
}