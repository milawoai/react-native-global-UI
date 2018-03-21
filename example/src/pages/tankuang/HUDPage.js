/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import {
  StyleSheet, Image, View, TouchableOpacity, Text, ScrollView, Animated, Easing
} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
// import {
//   HUD,
//   commonStyle,
// } from 'react-native-global-ui'

import {
  HUD,
  HUDBuilder,
  commonStyle,
} from 'react-native-global-ui'


class CustomHUD extends React.Component {
  state = {
    rotateAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation = () => {
    this.state.rotateAnim.setValue(0);
    Animated.timing(this.state.rotateAnim, {
      toValue: 360,
      duration: 3000,
      easing: Easing.linear
    }).start(this.startAnimation);// 开始spring动画
  }

  render() {
    let { rotateAnim } = this.state;
    return (
      <Animated.Image style={{width: 40, height: 40, borderRadius: 20,
        transform:[{rotate: rotateAnim
          .interpolate({inputRange: [0, 360],outputRange: ['0deg', '360deg']})
        }]
      }} source={require('../../image/loading.png')}/>
    );
  }
}

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

export default class HUDPage extends Component {
  constructor(props) {
    super(props);

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

    const LHUDBuilder = {
      title: 'LHUDBuilder',
      buttonInfos: [
        {
          text: 'success',
          onPress: () => {
            HUDBuilder().setHudText('success big').setHudTextStyle({
              fontSize: 40
            }).showSuccess()
          }
        },
        {// GlobalUI.showLoading({maskType: 'block'})
          text: 'fail',
          onPress: () => {
            HUDBuilder().setContentStyle({
              backgroundColor: 'rgba(255,0,0, 0.7)'
            }).showFail()
          }
        },
        {// GlobalUI.showLoading({maskType: 'none', disappearTime: 5000})
          text: 'set DisappearTime',
          onPress: () => {
            HUDBuilder().setDisappearTime(5000).setHudTextStyle({
              color: '#569922'
            }).showSuccess()
          }
        },
        {
          text: 'set hideCallBack',
          onPress: () => {
            HUDBuilder().setOnHide(() => {
              console.warn(`hideCallBack`)
            }).showFail()
          }
        },
        {
          text: 'setCustomHUDElem',
          onPress: () => {
            HUDBuilder().setCustomHUDElem(
              <CustomHUD />
            ).showFail()
          }
        },

        {// GlobalUI.hideLoading()
          text: '隐藏Loading',
          onPress: HUD.hide
        }
      ]
    }

    this.modalApis = [
      LoadingHUD,
      LHUDBuilder
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