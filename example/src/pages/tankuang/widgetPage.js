/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
import {
  Alert,
  Loading,
  HUD,
  ModalBuilder,
  commonStyle,
  commonConfig
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

    const LoadingInfo = {
      title: 'Loading',
      buttonInfos: [
        {
          text: '覆盖屏幕的loading',
          onPress: Loading.show
        },
        {
          text: '露出Nav的loading',
          onPress: Loading.show,
          params: {maskType: 'block'}
        },
        {
          text: '没有Mask的loading',
          onPress: Loading.show,
          params: {maskType: 'none'}
        },
        {
          text: '隐藏Loading',
          onPress:Loading.hide
        }
      ]
    }

    const LoadingHUD = {
      title: 'HUD',
      buttonInfos: [
        {
          text: 'success',
          onPress: HUD.show,
          params: {
            hintType: 'success',
            maskType: 'none'
          }
        },
        {// GlobalUI.showLoading({maskType: 'block'})
          text: 'fail',
          onPress: HUD.showFail
        },
        {// GlobalUI.showLoading({maskType: 'none', disappearTime: 5000})
          text: '设定时间',
          onPress: HUD.showSuccess,
          params: {disappearTime: 5000}
        },
        {// GlobalUI.hideLoading()
          text: '隐藏Loading',
          onPress: HUD.hide
        }
      ]
    }

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

    const Alerts = {
      title: 'Alert',
      buttonInfos: [
        {
          text: '普通提示弹框',
          onPress: () => {
            Alert.alert(
              '退款确认',
              '退款将在5-7个工作日内退到您的捐款账户，是否确定退款？',
              [
                {
                  text: '取消'
                },
                {
                  text: '确认退款',
                  onPress: () => {
                    console.warn('hello')
                    Alert.hide()
                  },
                  textStyle: {
                    color: config.getColors().mainColor,
                    fontWeight: '500'
                  }
                }
              ]
            )
          }
        },
        {
          text: '普通提示弹框',
          onPress: () => {
            Alert.alert(
              '退款确认',
              '退款将在5-7个工作日内退到您的捐款账户，是否确定退款？',
              [
                {
                  text: '取消'
                },
                {
                  text: '确认退款',
                  onPress: () => {
                    console.warn('hello')
                    Alert.hide()
                  },
                  textStyle: {
                    color: commonConfig.getColors().mainColor,
                    fontWeight: '500'
                  }
                }
              ]
            )
          }
        },
        {
          text: '单选项提示弹框',
          onPress: () => {
            Alert.alert(
              '退款确认',
              '退款将在5-7个工作日内退到您的捐款账户，是否确定退款？'
            )
          }
        },
        {
          text: '改变提示弹框样式',
          onPress: () => {
            Alert.alert(
              '退款确认',
              '退款将在5-7个工作日内退到您的捐款账户，是否确定退款？',
              [
                {
                  text: '取消'
                },
                {
                  text: '确认退款',
                  onPress: () => {
                    console.warn('hello')
                  }
                }
              ],
              {
                container: {
                  borderRadius: px2dp(0)
                },
                titleText: {
                  color: 'red'
                }
              }
            )
          }
        },
        {
          text: '改变Mask',
          onPress: () => {
            Alert.alert(
              '退款确认',
              '退款将在5-7个工作日内退到您的捐款账户，是否确定退款？',
              [],
              {},
              {
                maskStyle: {backgroundColor: 'white', opacity: 0.8},
                maskType: 'block'
              }
            )
          },

        }
      ]
    }

    this.modalApis = [
      LoadingInfo,
      LoadingHUD,
      Modals,
      Alerts
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