/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import {
  StyleSheet, Image, View, TouchableOpacity, Text, ScrollView, Animated, Easing
} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
import {
  Alert,
  Loading,
  LoadingBuilder,
  HUD,
  ModalBuilder,
  commonStyle,
  commonConfig
} from 'react-native-global-ui'


class RotateLoading extends React.Component {
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

export default class ModalPage extends Component {
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
          params: {maskType: 'block',loadingText: 'nav可点哦'}
        },
        {
          text: '没有Mask的loading',
          onPress: Loading.show,
          params: {maskType: 'none',loadingText: '旁边的loading可点哦'}
        },
        {
          text: '隐藏Loading',
          onPress: Loading.hide
        }
      ]
    }
    const LoadingBuilderInfo = {
      title: 'LoadingBuilder',
      buttonInfos: [
        {
          text: 'user builder setLoadingText',
          onPress: () => {
            LoadingBuilder().setLoadingText('LoadingText').show()
          }
        },
        {
          text: 'user builder setLoadingTextStyle',
          onPress: () => {
            LoadingBuilder().setLoadingText('LoadingText').setLoadingTextStyle(
              {'color': 'red', fontSize: 20}
            ).show()
          }
        },
        {
          text: 'user builder setLMaskType',
          onPress: () => {
            LoadingBuilder().setMaskType('none').setLoadingTextStyle(
              {'color': 'red', fontSize: 20}
            ).show()
          }
        },
        {
          text: 'user builder injectIndicateParams',
          onPress: () => {
            LoadingBuilder().injectIndicateParams(
              {
                indicatorStyle: {
                  position: 'relative',
                  left: 20,
                },
                // 提示指示器Style
                indicatorSize: 'small',
                // 提示指示器color
                indicatorColor: '#00ff00',
              }
            ).show()
          }
        },
        {
          text: 'user builder customLoading',
          onPress: () => {
            LoadingBuilder().setMaskType('none').setCustomLoading(
              <RotateLoading />
            ).show()
          }
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
      LoadingBuilderInfo,
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