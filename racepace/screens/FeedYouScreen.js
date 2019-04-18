import React from 'react';
import { ScrollView, Text } from 'react-native';
import FeedRoute from "../components/FeedRoute"
import Button from "../components/Button"

export default class FeedYouScreen extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent : 'flex-start', flexGrow: 1, alignItems: 'center'}}>
        <Button text="Follow Requests" style={{marginTop: 5}} onPress={() => this.props.navigation.navigate("Follow")}/>
        <FeedRoute 
        routeName="ok"
        postTime="yes"
        length="1"
        time="7"/> 
      </ScrollView>
    );
  }
}
