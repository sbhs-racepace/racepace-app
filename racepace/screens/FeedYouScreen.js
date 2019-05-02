import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import FeedRoute from "../components/FeedRoute"
import Button from "../components/Button"

export default class FeedYouScreen extends React.Component {
  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>
    }
    return (
      <View style={{flex:1}}>
        <Button 
          text="Follow Requests" 
          text_style={{padding:"3%"}} 
          style={{width:"100%", borderWidth:0}}
          onPress={() => this.props.navigation.navigate("Follow")}
        />
        <ScrollView contentContainerStyle={{ justifyContent : 'flex-start', flexGrow: 1, alignItems: 'center',}}>
          <FeedRoute 
            routeName="Run number 1"
            postTime="10am"
            length="1"
            time="7"
          /> 
          <FeedRoute 
            routeName="Run number 1"
            postTime="10am"
            length="1"
            time="7"
          /> 
          <FeedRoute 
            routeName="Run number 1"
            postTime="10am"
            length="1"
            time="7"
          /> 
        </ScrollView>
      </View>
    );
  }
}
