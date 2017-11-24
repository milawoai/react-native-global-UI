/**
 * Created by ygj on 2017/11/8.
 */
/**
 * Created by ygj on 2017/10/27.
 */
'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'

class ImageWithText extends Component {

  static propTypes = {
    text: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
      PropTypes.element,

    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ]),
    imageStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ]),
    wrapStyle: ViewPropTypes.style,
    horizontal: PropTypes.bool
  }

  static defaultProps = {
    horizontal: false
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {horizontal} = this.props
    if (horizontal) {
      return this.renderHorizontal()
    } else {
      return this.renderVertical()
    }
  }

  renderVertical = () => {

    let {text, textStyle, image, imageStyle, wrapStyle, renderImage} = this.props

    let imageView = null

    if (React.isValidElement(image)) {
      imageView = image
    } else {
      if (typeof image === 'string') {
        image = {uri: image}
      }

      imageView = (
        <Image style={[styles.imageStyle, imageStyle]} source={image} resizeMode={'contain'}/>
      )
    }

    return (
      <View style={[styles.wrapStyle, wrapStyle]}>
        {imageView}
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      </View>
    )
  }

  renderHorizontal = () => {
    return null
  }

}

const styles = StyleSheet.create({
  wrapStyle: {
    alignItems: 'center'
  },
  imageStyle: {
  },
  textStyle: {
    marginTop: 12
  }
})

export default ImageWithText