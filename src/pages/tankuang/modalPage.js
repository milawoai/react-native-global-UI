/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
import { lineWarpStyle} from '../../thirdwidgets/res/commonStyle'
import GlobalUI from '../../thirdwidgets/globalUI'


class CellItem extends Component {

  render() {
    const {title, buttonInfos} = this.props

    let buttonArea = buttonInfos.map((elem, index) => {
      return (
        <TouchableOpacity onPress={
          () => {
            elem.onPress(elem.params)
          }
        } style={CellItemStyle.buttonContainer} key={`buttonInfos${index}`}>
          <Text style={CellItemStyle.buttonText}>{elem.text}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <View style = {CellItemStyle.cellContainer}>
        <View style = {CellItemStyle.cellTitleContainer}>
          <Text style={CellItemStyle.cellTitle}>{title}</Text>
        </View>
        <View style={[CellItemStyle.buttonAreaContainer, lineWarpStyle]}>
          {buttonArea}
        </View>
      </View>
    )
  }
}

export default class ModalPage extends Component {
  constructor(props) {
    super(props);

    const LoadingInfo = {
      title: 'Loading',
      buttonInfos: [
        {// GlobalUI.showLoading()
          text: '覆盖屏幕的loading',
          onPress: GlobalUI.showLoading
        },
        {// GlobalUI.showLoading({maskType: 'block'})
          text: '露出Nav的loading',
          onPress: GlobalUI.showLoading,
          params: {maskType: 'block'}
        },
        {// GlobalUI.showLoading({maskType: 'none'})
          text: '没有Mask的loading',
          onPress: GlobalUI.showLoading,
          params: {maskType: 'none'}
        },
        {// GlobalUI.hideLoading()
          text: '隐藏Loading',
          onPress: GlobalUI.hideLoading
        }
      ]
    }

    this.modalApis = [
      LoadingInfo
    ]
  }
  
  render() {
    let cells =  this.modalApis.map((elem, index) => {
      return (
        <CellItem title = {elem.title} buttonInfos = {elem.buttonInfos} key={`modalApis_${index}`}>
        </CellItem>
      )
    })
    return (
      <View>
        {cells}
      </View>
    )
  }
}

const CellItemStyle = {
  cellContainer: {
   paddingBottom: px2dp(20)
  },
  cellTitleContainer: {
    backgroundColor: '#C0C0C0',
    height: px2dp(100),
    justifyContent: 'center',
    paddingLeft: px2dp(20),
    alignSelf: 'stretch'
  },
  cellTitle: {
   fontSize: px2sp(30)
  },
  buttonAreaContainer: {
    flexDirection: 'row',
    margin: px2dp(20),
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: px2dp(10),
    margin: px2dp(10),
    padding: px2dp(20)
  },
  buttonText: {
    fontSize: px2sp(30)
  }
}