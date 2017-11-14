/**
 * Created by ygj on 2017/9/13.
 * 底部弹框的承接 pick，分享。。
 */

import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import {
  View, StyleSheet,
  Image, TouchableOpacity,
  Text, LayoutAnimation,
  Platform,UIManager} from 'react-native'
import {px2dp} from "../../../../utils/screenUtils"
import links from '../../../../res/links'

export default class XPopUp extends Component {

  static propTypes = {
    ...View.propTypes,
    //动画效果：None：没有，slide：底部滑出
    animationType: PropTypes.oneOf(['none', 'slide']),
    //关闭监听
    onRequestClose: PropTypes.func,
    //关闭popup
    closePopUp: PropTypes.func,

    //是否允许点击背景关闭自己 （未完成）
    bgClose: PropTypes.bool,
    // 背景style，优先度最高
    bgStyle: PropTypes.object,
    // 背景模糊度
    opacity: PropTypes.number,
    // 白色背景
    bgLight: PropTypes.bool,
    //是否空出导航栏 （未完成）
    spaceNav: PropTypes.bool,
    //是否背景透明，不妨碍点击 （未完成）
    transparent: PropTypes.bool,

    // 弹框style
    containerStyle: PropTypes.object,
    // 弹框高度
    popUpHeight: PropTypes.number,
    // visible
    visible: PropTypes.bool
  }

  static defaultProps = {
    animationType: 'slide',
    opacity: 0.6,
    visible: true,
    popUpHeight: px2dp(410)
  };

  constructor(props) {
    super(props)
    this.state = {
      bottomHeight: 0
    }
    this.initAnimation()
  }

  componentDidMount() {
    this.startAnimation()
  }

  render () {
    let {transparent, opacity, bgLight, containerStyle, visible} = this.props

    if (!visible) return null

    let bgColorStyle = {
      backgroundColor: bgLight? 'white' : 'black',
      opacity: opacity
    }

    let bgView = !transparent?<View style={[styles.container, bgColorStyle, this.props.bgStyle]} />:null

    let {bottomHeight} = this.state
    return (
      <View style={[styles.container, this.props.style]}>
        {bgView}
        <View style={[styles.shareOutContainer, {height: bottomHeight}, containerStyle]}>
          {this.props.children}
        </View>
      </View>
    )
  }

  initAnimation = () => {
    switch (this.props.animationType) {
      case 'slide':
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        break
    }
  }

  startAnimation = () => {
    switch (this.props.animationType) {
      case 'slide':
        setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
          this.setState({
            bottomHeight: this.props.popUpHeight
          })
        }, 100)
        break
      default:
        this.setState({
          bottomHeight: this.props.popUpHeight
        })
        break
    }
  }

  startCloseAction = () => {
    switch (this.props.animationType) {
      default:
        this.closeImmidiate()
    }
  }

  closeImmidiate = () => {
    this.props.onRequestClose && this.props.onRequestClose()
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  shareOutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden'
  },
})

