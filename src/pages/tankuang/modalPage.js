/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
import GlobalUI from '../../thirdwidgets/globalUI'


class CellItem extends Component {

  render() {
    const {title, buttonInfos} = this.props

    let buttonArea = buttonInfos.map((elem, index) => {
      return (
        <TouchableOpacity onPress={elem.onPress}
                          style={CellItemStyle.buttonContainer}
                          key={`buttonInfos${index}`}
        >
          <Text style={CellItemStyle.buttonText}>{elem.text}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <View style = {CellItemStyle.cellContainer}>
        <View style = {CellItemStyle.cellTitleContainer}>
          <Text style={CellItemStyle.cellTitle}>{title}</Text>
        </View>
        <View style={CellItemStyle.buttonContainer}>
          {buttonArea}
        </View>
      </View>
    )
  }
}

export default class ModalPage extends Component {
  constructor(props) {
    super(props);

    this.modalApis = [
      {
        title: 'Loading',
        buttonInfos: [
          {
            text: '全局loading',
            onPress: GlobalUI.showLoading

          }
        ]
      }
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
    backgroundColor: '#f0f0f0',
    height: px2dp(100),
    justifyContent: 'center',
    paddingLeft: px2dp(20),
    alignSelf: 'stretch'
  },
  cellTitle: {
   fontSize: px2sp(30)
  },
  buttonContainer: {
    backgroundColor: 'white',
    margin: px2dp(20)
  },
  buttonText: {
    fontSize: px2sp(30)
  }
}