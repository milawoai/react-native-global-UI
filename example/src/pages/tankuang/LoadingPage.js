/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import {
  View, TouchableOpacity, Text, ScrollView, Animated, Easing
} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
import {
  Loading,
  LoadingBuilder,
  commonStyle
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

export default class LoadingPage extends Component {
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

    this.modalApis = [
      LoadingInfo,
      LoadingBuilderInfo
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