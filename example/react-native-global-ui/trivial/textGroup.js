/**
 * Created by ygj on 2017/10/27.
 */
'use strict'
import React, { PropTypes, Component } from 'react'
import {
  Text,
  View
} from 'react-native'

class TextGroup extends Component {

  static propTypes = {
    texts: PropTypes.array,
    gap: PropTypes.number,
    textStyles: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    horizontal: PropTypes.bool
  }

  static defaultProps = {
    horizontal: false
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {texts, textStyles, gap, horizontal} = this.props
    if (!texts) return null
    let maxLength = texts.length
    return (
      <View>
        {texts.map((elem, index) => {
          let gapStyle =  {}
          if (index < maxLength - 1) {
            gapStyle = horizontal? {marginRight: gap} : {marginBottom: gap}
          }
          return (
            <Text style={[textStyles, gapStyle]} key={`text_group_${index}`} >
              {elem}
            </Text>
          )
        })}
      </View>
    )
  }

}

export default TextGroup