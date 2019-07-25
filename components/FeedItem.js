// Jason Yu

import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Image } from "react-native-elements";
import MapView from "react-native-maps";
import { Polyline } from "react-native-maps";
import Button from "./Button";
import request from "../functions/request";
import "../global";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Color from "../constants/Color";
import { noLabel, cobalt, lunar, neutral_blue } from "../constants/mapstyle";

const STYLES = StyleSheet.create({
  feed_item: {
    borderWidth: 5,
    borderColor: Color.buttonColor,
    padding: "5%",
    width: "100%",
    backgroundColor: Color.lightBackground
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: "3%"
  },
  user_info: {
    flexDirection: "column"
  },
  user_profile: {
    flexDirection: "row",
    alignItems: "center"
  },
  map: {
    aspectRatio: 1.7,
    width: "100%",
    borderRadius: 5
  },
  likeCommentButton: {
    width: "50%",
    borderWidth: 0
  },
  text: {
    color: Color.textColor
  },
  likeCommentCombo: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 10,
    padding: "0%"
  }
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", color: Color.textColor }}>
          {this.props.name}:
        </Text>
        <Text style={{ color: Color.textColor }}> {this.props.comment}</Text>
      </View>
    );
  }
}

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes.length,
      liked: this.props.likes.includes(this.props.user.user_id),
      comments: this.props.comments || [],
      commentInput: "",
      showComments: false
    };
    if (this.props.route.length == 0) {
      this.props.route.push({
        ...global.default_location,
      }); // SBHS if empty route
    }
    this.likedBefore = this.props.likes.includes(this.props.user.user_id);
    this.loadTime = new Date().getTime()
  }

  like() {
    this.setState(
      prevState => {
        return {
          liked: !prevState.liked,
          likes: this.props.likes.length + !prevState.liked - this.likedBefore
        };
      },
      () =>
        request(
          "/api/update_run",
          "POST",
          {
            owner: this.props.ownerid,
            runID: this.props.runid,
            like: this.state.liked
          },
          this.props.user.token
        )
    );
  }

  sendComment() {
    if (this.state.commentInput == "") {
      return 0; //Do not send empty comment
    }
    request(
      "/api/update_run",
      "POST",
      {
        owner: this.props.ownerid,
        runID: this.props.runid,
        comment: this.state.commentInput
      },
      this.props.user.token
    );
    this.setState(prevState => {
      prevState.comments.push([
        this.props.user.full_name,
        this.state.commentInput
      ]);
      return {
        comments: prevState.comments,
        commentsInput: ""
      };
    });
    this.setState({commentInput: ""})
  }

  calcMapRegion() {
    let lat_list = this.props.route.map(point => point.latitude);
    let max_lat = Math.max(...lat_list);
    let min_lat = Math.min(...lat_list);
    let lon_list = this.props.route.map(point => point.longitude);
    let max_lon = Math.max(...lon_list);
    let min_lon = Math.min(...lon_list);
    let region = {
      latitude: (max_lat + min_lat)/2,
      longitude: (max_lon + min_lon)/2,
      latitudeDelta: max_lat - min_lat + 0.001,
      longitudeDelta: max_lon - min_lon + 0.0005,
    }
    return region
  }

  render() {
    return (
      <View style={STYLES.feed_item}>
        <View style={STYLES.user_profile}>
          <Image
            PlaceholderContent={
              <ActivityIndicator color="white" size="large" />
            }
            style={STYLES.profilePic}
            source={{
              uri: `${global.serverURL}/api/avatars/${
                this.props.ownerid
              }.png?rand=${this.loadTime}`
            }}
          />
          <View style={STYLES.user_info}>
            <Text style={[STYLES.text, { fontWeight: "bold" }]}>
              {this.props.username}
            </Text>
            <Text style={STYLES.text}>{this.props.posttime}</Text>
            <Text style={[STYLES.text, { fontWeight: "bold" }]}>
              {this.props.routename}
            </Text>
          </View>
        </View>

        <View style={{ padding: "5%", paddingLeft: "0%" }}>
          <Text style={STYLES.text}>{this.props.description}</Text>
          <Text style={STYLES.text}>
            Length: {this.props.length.toFixed(1)}m
          </Text>
        </View>

        <MapView
          style={STYLES.map}
          provider={MapView.PROVIDER_GOOGLE} // Usage of google maps
          customMapStyle={lunar}
          showsMyLocationButton={false}
          region={this.calcMapRegion()}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Polyline
            coordinates={this.props.route}
            strokeColor={Color.primaryColor}
            strokeWidth={4}
          />
        </MapView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <Text style={STYLES.text}>
            {this.state.likes} Like{this.state.likes == 1 ? "" : "s"}
          </Text>
          <Text style={STYLES.text}>
            {this.state.comments.length} Comment
            {this.state.comments.length == 1 ? "" : "s"}
          </Text>
        </View>
        {this.state.showComments && (
          <View>
            {this.state.comments.map(comment => (
              <Comment name={comment[0]} comment={comment[1]} />
            ))}
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <TextInput
                placeholder="Enter a comment here..."
                style={{
                  width: "90%",
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 1,
                  fontSize: 14,
                  color: Color.textColor
                }}
                value={this.state.commentInput}
                onChangeText={text => this.setState({ commentInput: text })}
              />
              <Button
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  marginLeft: 5
                }}
                onPress={this.sendComment.bind(this)}
              >
                <FontAwesome5Icon
                  name="paper-plane"
                  size={STYLES.smallIcon}
                  color={Color.primaryColor}
                />
              </Button>
            </View>
          </View>
        )}
        <View style={STYLES.likeCommentCombo}>
          <Button
            text={this.state.liked ? "Liked" : "Like"}
            style={STYLES.likeCommentButton}
            onPress={this.like.bind(this)}
          />
          <Button
            text="Comment"
            style={STYLES.likeCommentButton}
            onPress={() => this.setState({ showComments: true })}
          />
        </View>
      </View>
    );
  }
}
