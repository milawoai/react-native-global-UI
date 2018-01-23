/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
// import {
//   Alert,
//   Loading,
//   HUD,
//   ModalBuilder,
//   commonStyle,
//   commonConfig
// } from 'react-native-global-ui'

import {
  Alert,
  Loading,
  HUD,
  ModalBuilder,
  PopUpBuilder,
  CollectionPopUp,
  commonStyle,
  commonConfig
} from '../../../react-native-global-ui/index'

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
        <View style={[CellItemStyle.buttonAreaContainer, commonStyle.lineWarpStyle]}>
          {buttonArea}
        </View>
      </View>
    )
  }
}

export default class WidgetPage extends Component {
  constructor(props) {
    super(props);

    const Modals = {
      title: 'Modal',
      buttonInfos: [
        {
          text: '图片弹框',
          onPress: () => {
            ModalBuilder('ImageModal').injectParams(
              {
                'handleModalSureClick': () => {
                  Alert.alert('handleBtnClick')
                },
                'adImageUrl': ''
              }
            ).show()
          }
        },
        {
          text: '说明弹框',
          onPress: () => {
            ModalBuilder('HintModal').injectParams(
              {
                'handleButtonClick': () => {
                  Alert.alert('handleButtonClick')
                },
                containerStyle: {
                  borderRadius: px2dp(20)
                },
                title: '阿姨洗铁路'
              }
            ).show()
          }
        }
      ]
    }

    const PopUps = {
      title: 'PopUps',
      buttonInfos: [
        {
          text: 'collection',
          onPress: () => {
            CollectionPopUp().injectParams(
              {
                bgClose: true,
                dataSource: ['a', 'b', 'c', 'd'],
                lineNum: 3,
                renderItem: (elem, index) => {
                  return (<Text>{elem}</Text>)
                }
              }
            ).injectWrapParams({bgClose: true}).show()
          }
        }
      ]
    }

    this.modalApis = [
      Modals,
      PopUps
    ]
  }

  render() {
    let cells =  this.modalApis.map((elem, index) => {
      return (
        <CellItem title = {elem.title}
                  buttonInfos = {elem.buttonInfos}
                  key={`modalApis_${index}`} />
      )
    })
    return (
      <ScrollView>
        {cells}
      </ScrollView>
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