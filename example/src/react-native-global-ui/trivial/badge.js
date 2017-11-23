/**
 * Created by ygj on 2017/11/8.
 */
/**
 * Created by ygj on 2017/10/27.
 */
'use strict'
import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

const ViewPropTypes = require('ViewPropTypes');

import LinearGradient from 'react-native-linear-gradient'

class Badge extends Component {

  static propTypes = {
    text: PropTypes.string,
    colors: PropTypes.array,
    size: PropTypes.number,
    textStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ])
  }

  static defaultProps = {
    horizontal: false
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {text, colors, size, textStyle} = this.props
    const wrapStyle = {
      height: size,
      width: size,
      borderRadius: 100
    }
    const deTextStyle = {
      fontSize:parseInt(size/2)
    }

    return (
    <LinearGradient colors={colors}
                    style={[styles.wrapStyle, wrapStyle, this.props.style]}>
      <Text style={[styles.textStyle, deTextStyle,textStyle]}>{text}</Text>
    </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  wrapStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  bkStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 0,
    height: 0
  },
  textStyle: {
    color: 'white',
    backgroundColor: 'transparent'
  }
})

export default Badge