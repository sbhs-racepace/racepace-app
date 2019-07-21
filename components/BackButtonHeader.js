// Jason Yu / Abdur Raqeeb

import React from 'react';
import { Header } from 'react-native-elements'
import Color from '../constants/Color'

export default class BackButtonHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress() {
      this.props.onPress()
  }

  render() {
    return (
    <Header
      leftComponent={{ text: 'Back', style: {color: Color.textColor }, onPress: this.onPress.bind(this)}}
      centerComponent={{ text: this.props.title, style: {color: Color.textColor }}}
      backgroundColor={Color.darkBackground}
      containerStyle={{ marginTop: -20, borderBottomWidth: 0}}
    />
    )
  }
}