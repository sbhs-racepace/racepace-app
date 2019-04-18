import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native';
import Button from '../components/Button'
const STYLES = StyleSheet.create({
  thebuttons: {
    fontSize:20,
    borderWidth: 1,
    width:"80%",
    borderRadius:10,
  }})
export default class MoreScreen extends React.Component {
  render() {
    return (
      <View>
      <Button 
      text= "Account Settings"
      onPress={() => 
              this.props.navigation.navigate('Settings')
            }
      style= {STYLES.thebuttons}/>
      <Button 
      text= "Statistics"
      style= {STYLES.thebuttons}/>
      <Button 
      style= {STYLES.thebuttons}
      text= "Routes"
      onPress={() => 
              this.props.navigation.navigate('Routes')
            }/>
      </View>
    )
  }

}