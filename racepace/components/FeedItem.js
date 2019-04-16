import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from "./Button"

const STYLES = StyleSheet.create({
	feed_item : {
		borderWidth:1,
		padding: "5%",
		width:"80%"
	},
  profilePic: {
    width:60,
    height:60,
    borderRadius: 30,
  },
  routePic: {
    width:"100%"
  },
  button: {
    fontSize:20,
    width:"40%",
    borderRadius:10,
  }
})

export class FeedItem extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View style={STYLES.feed_item}>
				<View style={{flexDirection: "row"}}>
					<Image source={require('../assets/cat.jpeg')} style={STYLES.profilePic}/>
					<View>
						<Text>{this.props.username}</Text>
						<Text>{this.props.posttime}</Text>
					</View>
				</View>
				<Text>{this.props.routename}</Text>
				<Text>Description: {this.props.description}</Text>
				<Text>Stats: {this.props.length}km {this.props.time}m</Text>
				<Image source={require('../assets/cat.jpeg')} style={STYLES.routePic} />
				<View style={{flexDirection: "row", justifyContent: 'space-between', width:"100%"}}>
					<Button text="Like" style={STYLES.button}/>
					<Button text="Comment" style={STYLES.button} />
				</View>
			</View>
		)
	}
}