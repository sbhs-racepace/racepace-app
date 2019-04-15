import React from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const styles = StyleSheet.create({

  route_item: {
    padding:"3%",
    margin:"3%",
    borderWidth:1,
    borderColor:"black",
    borderStyle:"solid",
    borderRadius:20,
    flexDirection:"column",
  },
  route_box: {
    flexDirection:"column",
  }
})

class RouteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.route_item}>
        <Text>{this.props.route.start} to {this.props.route.end}</Text>
        <Text>{this.props.route.dist}km</Text>
      </View>
    )
  }
}

export default class RouteListScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  
  render() {
    let routes = global.user_routes.map(route => <RouteItem route={route}/>);
    return (
      <View style={{flexDirection:"column", flex:1}}>
        <ScrollView style={styles.route_box}>
          {routes}
        </ScrollView>
      </View>
    );
  }
}