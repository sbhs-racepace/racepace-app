import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import FeedRoute from '../components/FeedRoute';
import Button from '../components/Button';
import request from '../functions/request';
import '../global'
import Color from '../constants/Color'

const STYLES = StyleSheet.create({
  scrollView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor:Color.lightBackground,
  },
});

export default class FeedYouScreen extends React.Component {
  render() {
    if (!global.login_status.success && !global.TEST) {
      return <Text>Please login to see your feed</Text>;
    }

    if (global.login_status.success) {
      let resp = request('/api/get_recent_routes', 'POST', {}, true);
      if (resp.error) {
        return <Text>An error occurred. {resp.description}</Text>
      }
      resp = resp.recent_routes;
    }

    const test_data = (
      <ScrollView contentContainerStyle={STYLES.scrollView}>
        <FeedRoute
          from="Hyde Park"
          to="Circular Quay"
          postTime="10am"
          length="1"
        />
        <FeedRoute
          from="Hyde Park"
          to="Circular Quay"
          postTime="10am"
          length="1"
        />
        <FeedRoute
          from="Hyde Park"
          to="Circular Quay"
          postTime="10am"
          length="1"
        />
      </ScrollView>
    );

    return (
      <View style={{flex:1,backgroundColor:Color.lightBackground}}>
        <View style={{height:40}}>
          <Button
            text="Follow Requests"
            style={{height:"100%",width:"100%", backgroundColor:Color.darkBackground}}
            text_style={{color: Color.offColor, padding:"3%"}}
            onPress={() => this.props.navigation.navigate('Follow')}
          />
        </View>
        {global.TEST && test_data}
        {!global.TEST &&
          resp.map(route=>
          <FeedRoute
            from={route.real_time_route.route.from}
            to={route.real_time_route.route.to}
            postTime={route.real_time_route.start_time}
            length={route.real_time_route.route.distance}
          />)
        }
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
