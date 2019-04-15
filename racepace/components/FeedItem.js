import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from "./Button"

export class FeedItem extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View>
				<View style={{flexDirection: "row"}}>
					<Image source='../assets/cat.jpeg' />
					<View>
						<Text>{this.props.username}</Text>
						<Text>{this.props.posttime}</Text>
					</View>
				</View>
				<Text>{this.props.routename}</Text>
				<Text>Description: {this.props.description}</Text>
				<Text>Stats: {this.props.length}km {this.props.time}m</Text>
				<Image source='../assets/cat.jpeg' />
				<View style={{flexDirection: "row"}}>
					<Button text="Like"/>
					<Button text="Comment"/>
				</View>
			</View>
		)
	}
}