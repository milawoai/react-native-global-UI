/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {px2dp, px2sp} from "../../../../utils/screenUtils"
import PropTypes from 'prop-types'


class SheetPopUp extends Component {

  static PropsType = {
    ...View.propTypes,

    renderItem: PropTypes.func,
    lineHeight: PropTypes.number,
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,

    dataSource: PropTypes.array, // {text: action:}
    useCancelButton: PropTypes.bool,
    renderCancelButton: PropTypes.func,
  }

  static defaultProps = {
    lineHeight: px2dp(120),
    fontColor: '#666666',
    fontSize: px2sp(30),
    useCancelButton: false
  }

  constructor (props) {
    super(props)
  }

  render = () => {
    let self = this
    const {dataSource} = this.props
    return (
      <View style={styles.sheetContainer} {...this.props} >
        {dataSource ?
          dataSource.map((elem, index) => {
            return self.renderSheetItem(elem.text, elem.action)
          })
          : null}
        {this.renderCancelButton()}
      </View>
    )
  }

  renderSheetItem = (text, action) => {
    const {renderItem, lineHeight, fontColor, fontSize} = this.props
    if (renderItem) return  renderItem(text, action)
    return (
      <TouchableOpacity activeOpacity={1}
        style={[styles.sheetItemContainer, {height: lineHeight}]}
        onPress={(e) => {action && action(e)}}
      >
        <Text style={[styles.sheetItemText, {fontSize: fontSize, color: fontColor}]}>{text}</Text>
      </TouchableOpacity>
    )
  }

  renderCancelButton() {
    const {useCancelButton} = this.props
    if (!useCancelButton) return null
    // if ()
  }
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: '#F1F1F1',
    overflow: 'hidden',
    height: px2dp(500),
    alignSelf: 'stretch'
  },
  sheetItemContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sheetItemText: {

  }
})

export default SheetPopUp
