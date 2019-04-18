import * as React from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from "./Button"

const STYLES = StyleSheet.create({
	feed_item : {
		borderWidth:1,
		padding: "5%",
		width:"100%",
	},
  profilePic: {
    width:60,
    height:60,
		borderRadius: 30,
		margin:"3%",
	},
	user_info: {
		flexDirection: "column", 
		margin:"3%"
	},
	user_profile: {
		flexDirection: "row", alignItems: 'center'
	},
  routePic: {
		width:"100%",
  },
  button: {
    fontSize:20,
    width:"40%",
		borderWidth:0,
	},
})

export class FeedItem extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<View style={STYLES.feed_item}>
				<View style={STYLES.user_profile}>
					<Image source={require('../assets/cat.jpeg')} style={STYLES.profilePic}/>
					<View style={STYLES.user_info}>
						<Text style={{textVerticalAlign:"bottom"}}>{this.props.username}</Text>
						<Text style={{textVerticalAlign:"bottom"}}>{this.props.posttime}</Text>
					</View>
				</View>

				<View style={{margin:"3%"}}>
					<Text>{this.props.routename}</Text>
					<Text>Description: {this.props.description}</Text>
					<Text>Stats: {this.props.length}km {this.props.time}m</Text>
				</View>

				<Image source={require('../assets/cat.jpeg')} style={STYLES.routePic} />
				<View
					style={{flexDirection: "row", justifyContent: 'space-between', width:"100%"}}
				>
					<Text>0 Likes</Text>
					<Text>0 Comments</Text>
				</View>

				<View style={{flexDirection: "row", justifyContent: 'space-between', width:"100%", backgroundColor: "rgb(0, 153, 255)", borderRadius:10,padding:"3%"}}>
					<Button text="Like" style={STYLES.button}/>
					<Text>|</Text>
					<Button text="Comment" style={STYLES.button} />
				</View>
			</View>
		)
	}
}