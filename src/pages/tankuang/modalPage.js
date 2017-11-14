/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native'
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
          onPress: GlobalUI.Loading.show
        },
        {// GlobalUI.showLoading({maskType: 'block'})
          text: '露出Nav的loading',
          onPress: GlobalUI.Loading.show,
          params: {maskType: 'block'}
        },
        {// GlobalUI.showLoading({maskType: 'none'})
          text: '没有Mask的loading',
          onPress: GlobalUI.Loading.show,
          params: {maskType: 'none'}
        },
        {// GlobalUI.hideLoading()
          text: '隐藏Loading',
          onPress: GlobalUI.Loading.hide
        }
      ]
    }

    const LoadingHUD = {
      title: 'HUD',
      buttonInfos: [
        {// GlobalUI.showHUD({hintType: 'success'})
          text: 'success',
          onPress: GlobalUI.HUD.show,
          params: {
            hintType: 'success',
            maskType: 'none'
          }
        },
        {// GlobalUI.showLoading({maskType: 'block'})
          text: 'fail',
          onPress: GlobalUI.HUD.showFail
        },
        {// GlobalUI.showLoading({maskType: 'none', disappearTime: 5000})
          text: '设定时间',
          onPress: GlobalUI.HUD.showSuccess,
          params: {disappearTime: 5000}
        },
        {// GlobalUI.hideLoading()
          text: '隐藏Loading',
          onPress: GlobalUI.hide
        }
      ]
    }

    const Modals = {
      title: 'Modal',
      buttonInfos: [
        {// GlobalUI.showHUD({hintType: 'success'})
          text: '图片弹框',
          onPress: () => {
            GlobalUI.ModalBuilder('ImageModal').injectParams(
              {
                'handleModalSureClick': () => {
                  Alert.alert('handleBtnClick')
                },
                'adImageUrl': ''
              }
            ).show()
          }
        }
      ]
    }

    const Alerts = {
      title: 'Alert',
      buttonInfos: [
        {// GlobalUI.showHUD({hintType: 'success'})
          text: '提示弹框',
          onPress: () => {
            GlobalUI.Alert.alert(
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
              ]
            )
          }
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
        <CellItem title = {elem.title} buttonInfos = {elem.buttonInfos} key={`modalApis_${index}`}>
        </CellItem>
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