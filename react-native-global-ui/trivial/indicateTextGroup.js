/**
 * Created by ygj on 2017/10/27.
 */
'use strict'
import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const ViewPropTypes = require('ViewPropTypes');

class IndicateTextGroup extends Component {

  static propTypes = {
    texts: PropTypes.array,
    gap: PropTypes.number,
    textStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    wrapStyle: ViewPropTypes.style,
    horizontal: PropTypes.bool,
    renderIndicate: PropTypes.func
  }

  static defaultProps = {
    horizontal: false
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {texts, textStyle, wrapStyle, gap, horizontal, renderIndicate} = this.props
    if (!texts) return null
    let maxLength = texts.length
    return (
      <View {...this.props}>
        {texts.map((elem, index) => {
          let gapStyle =  {}
          if (index < maxLength - 1) {
            gapStyle = horizontal? {marginRight: gap} : {marginBottom: gap}
          }
          return (
            <View style={[styles.wrapStyle, wrapStyle, gapStyle]} key={`text_group_${index}`}>
              {this.renderIndicate()}
              <Text style={[textStyle]}>
                {elem}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }


  renderIndicate = () => {
    const {renderIndicate} = this.props
    if (renderIndicate) {
      return renderIndicate
    } else {
      return (
        <View style={styles.indicator}>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  wrapStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  indicator: {
    backgroundColor: '#777777',
    width: 3,
    height: 3,
    borderRadius: 2
  }
})

export default IndicateTextGroup