import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import FeedRoute from '../components/FeedRoute';
import Button from '../components/Button';
import request from '../request';
import '../global'

const STYLES = StyleSheet.create({
  scrollView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor:global.colors.lightBackground,
  },
});

export default class FeedYouScreen extends React.Component {
  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>;
    }

    if (!global.TEST) {
      let resp = JSON.parse(
        request('/api/get_recent_routes', 'POST', {}, true)._bodyText
      );
      resp = resp.recent_routes;
    }

    const test_data = (
      <ScrollView contentContainerStyle={STYLES.scrollView}>
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
    );

    return (
      <View style={{flex:1,backgroundColor:global.colors.lightBackground}}>
          <Button
            text="Follow Requests"
            style={{width:"100%", backgroundColor:global.colors.darkBackground}}
            text_style={{color: global.colors.offColor, padding:"3%"}}
            onPress={() => this.props.navigation.navigate('Follow')}
          />
          {test_data}
      </View>
    );
  }
}


{/* {global.TEST && (
  <ScrollView contentContainerStyle={STYLES.scrollView}>
    {resp.map(route => {
      {
        route.real_time_route.active && (
          <FeedRoute
            routeName=""
            postTime={route.real_time_route.start_time}
            length={route.real_time_route.current_distance}
            time={route.real_time_route.current_duration}
          />
        );
      }
    })}
  </ScrollView>
)} */}
