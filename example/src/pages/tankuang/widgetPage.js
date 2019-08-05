/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View, Platform, TouchableOpacity, Text, ScrollView} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'

import {
  Alert,
  Loading,
  HUD,
  ModalBuilder,
  commonStyle,
  commonConfig,
  CollectionPopUp
} from 'react-native-global-ui'

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
        },
        // {
        //   text: '新式弹框',
        //   onPress: () => {
        //     let agreementContentText = {
        //       color: '#666',
        //       marginTop: px2dp(10),
        //       marginLeft: px2dp(10),
        //       marginRight: px2dp(10),
        //       fontSize: px2sp(24),
        //       ...Platform.select({
        //         ios: {
        //           lineHeight: px2sp(28),
        //         }
        //       })
        //     }
        //     let secondTitleStyle =  {
        //       fontWeight: '500',
        //       fontSize: px2sp(26),
        //       marginTop: px2dp(30),
        //       marginBottom: px2dp(20),
        //       marginLeft: px2dp(10),
        //       marginRight: px2dp(10),
        //     }
        //     ModalBuilder(AlertModal).injectParams(
        //       {
        //         title: '水滴筹个人求助信息发布条款',
        //         textStyle: 'agreementContentText',
        //         contents: [
        //           {
        //             style: secondTitleStyle,
        //             text: '“水滴筹”是北京纵情向前科技有限公司（以下简称“运营方”）运营的为无力承担医疗费用的重大疾病患者提供求助信息发布的平台。',
        //           },
        //           {
        //             style: agreementContentText,
        //             text: '禁止通过水滴筹为慈善组织或任何慈善募捐项目发布募捐信息。',
        //           },
        //           {
        //             style: agreementContentText,
        //             text: '发起人提交相关申请材料不代表已获得资助筹款资格。',
        //           },
        //           {
        //             style: agreementContentText,
        //             text: '因国家宏观政策以及法律法规、相关监管规定的调整，水滴筹有权随时对发布信息进行调整、下线且不承担任何相关责任。',
        //           }
        //         ]
        //       }
        //     ).show()
        //   }
        // }
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
                dataSource: ['a', 'b', 'c', 'd'],
                lineNum: 4,
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