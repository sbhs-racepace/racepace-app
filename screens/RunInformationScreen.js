// Jason Yu, Sunny Yan

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Image
} from "react-native";
import Button from "../components/Button";
import BackButtonHeader from "../components/BackButtonHeader";
import MapView from "react-native-maps";
import { Polyline } from "react-native-maps";
import Color from "../constants/Color";
import { noLabel, cobalt, lunar, neutral_blue } from "../constants/mapstyle";
import { startRun, addLocationPacket } from "../functions/run_action";
import { minuteSecondString } from "../functions/conversions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import '../global.js'

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const STYLES = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center"
  },
  text_style: {
    color: Color.textColor,
    fontSize: 15
  },
  title_style: {
    fontSize: 20,
    fontFamily: "Roboto",
    textAlign: "center",
    color: Color.textColor
  },
  map: {
    aspectRatio: 1.7,
    width: "80%",
    borderRadius: 5
  }
});

class RunInformationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  calcMapRegion() {
    if (this.props.run.run_info.route.length > 0) {
      let lat_list = this.props.run.run_info.route.map(point => point.latitude);
      let max_lat = Math.max(...lat_list);
      let min_lat = Math.min(...lat_list);
      let lon_list = this.props.run.run_info.route.map(point => point.longitude);
      let max_lon = Math.max(...lon_list);
      let min_lon = Math.min(...lon_list);
      let region = {
        latitude: (max_lat + min_lat)/2,
        longitude: (max_lon + min_lon)/2,
        latitudeDelta: max_lat - min_lat + 0.001,
        longitudeDelta: max_lon - min_lon + 0.0005,
      }
      return region;
    } else {
      let region =  {
        ...global.default_location,
        latitudeDelta:0.005, 
        longitudeDelta:0.005,
      }
      return region;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.lightBackground }}>
        <BackButtonHeader
          title="Route Information"
          onPress={this.props.navigation.goBack}
        />
        <View
          style={[
            STYLES.container,
            { alignItems: "center", justifyContent: "space-around", flex: 1 }
          ]}
        >
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
              coordinates={this.props.run.run_info.route}
              strokeColor={Color.primaryColor}
              strokeWidth={4}
            />
          </MapView>
          <Text style={STYLES.title_style}>Route Stats</Text>
          <Text style={STYLES.text_style}>
            Goal Pace: {minuteSecondString(this.props.run.run_info.goal_pace)}
          </Text>
          <Text style={STYLES.text_style}>
            Duration:{" "}
            {minuteSecondString(this.props.run.run_info.estimated_duration)}
          </Text>
          <Text style={STYLES.text_style}>
            Total Distance:{" "}
            {Math.ceil(this.props.run.run_info.estimated_distance)} m
          </Text>
          <Text style={STYLES.text_style}>
            Kilojoules Burnt:{" "}
            {Math.ceil(this.props.run.run_info.estimated_energy)} Kj
          </Text>
          <Text style={STYLES.text_style}>
            Points: {this.props.run.run_info.points}
          </Text>
        </View>

        <Button
          text="Save Route"
          style={{ borderRadius: 10, alignSelf: "center" }}
          onPress={() => {
            this.props.navigation.navigate("SaveRoute");
          }}
        />

        <Button
          text="Start Run"
          style={{ borderRadius: 10, alignSelf: "center" }}
          onPress={() => {
            this.props.startRun(new Date());
            this.props.navigation.navigate("RunManager");
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addLocationPacket, startRun }, dispatch);
}

function mapStateToProps(state) {
  const { user, run } = state;
  return { user, run };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RunInformationScreen);
