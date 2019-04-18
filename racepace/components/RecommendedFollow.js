import React from 'react';
import { ScrollView, View, Text, Alert, StyleSheet } from 'react-native';
import Button from "../components/Button"

const STYLES = StyleSheet.create({
  recommended_follow_view: {flex: 1, margin:"5%", flexDirection:"row"},
  recommended_follow_text: {flex:2},
  recommended_follow_button: {flex:1 ,borderRadius:10}

});

export default class RecommendedFollow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={STYLES.recommended_follow_view}>
        <Text style={STYLES.recommended_follow_text}>{this.props.name}</Text>
        <Button style={STYLES.recommended_follow_button} text="Follow"/>
      </View>
    )
  }
}