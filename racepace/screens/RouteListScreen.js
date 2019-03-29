import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Button from "../components/Button"
import "../global.js"

const styles = StyleSheet.create({
  routeBox: {
    borderWidth: 2
  }
})
export default class RouteListScreen extends React.Component {
  constructor(state) {
    super(state);
  }
  
  render() {
    let routeElements = (
        <View style={styles.routeBox}>
          <Text>{global.user_routes[0].begin} -> {global.user_routes[0].end}</Text>
        </View>
      )
    for (let route of global.user_routes) {
      routeElements += (
        <View style={styles.routeBox}>
          <Text>{route.begin} -> {route.end}</Text>
        </View>
      );
    }
    return (
      <View style={{flex:1}}>
        {routeElements}
      </View>
    );
  }
}