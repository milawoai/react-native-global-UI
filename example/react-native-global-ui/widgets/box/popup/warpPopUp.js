/**
 * Created by ygj on 2017/9/13.
 * 底部弹框的承接 pick，分享。。
 */

import React, { Component } from 'react'
import {
  View, StyleSheet, LayoutAnimation,
  Platform,UIManager} from 'react-native'
import {px2dp} from "../../../utils/screenUtils"
import PropTypes from 'prop-types'
import {MaskWarp} from '../MaskNest'

class XPopUp extends Component {

  static propTypes = {
    ...View.propTypes,
    //是否通过Api调用
    isApi: PropTypes.bool,
    //动画效果：None：没有，slide：底部滑出
    animationType: PropTypes.oneOf(['none', 'slide']),
    //关闭方法
    onRequestClose:PropTypes.func,
    // 弹框style
    containerStyle: PropTypes.object,
    // 弹框高度
    popUpHeight: PropTypes.number,
  }

  static defaultProps = {
    animationType: 'none',
    opacity: 0.6,
    isApi: true
  };

  constructor(props) {
    super(props)
    this.state = {
      bottomHeight: 0,
      visible: this.props.isApi
    }
    this.initAnimation()
  }

  componentDidMount() {
    if (this.props.isApi) {
      this.startAnimation()
    }
  }

  render () {
    if (!this.state.visible) return null

    let {bottomHeight} = this.state
    return (
      <View style={[styles.shareOutContainer, {minHeight: bottomHeight}, this.props.style]}>
        {this.props.children}
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
            bottomHeight: parseInt(this.props.popUpHeight),
            visible: true
          })
        }, 100)
        break
      default:
        this.setState({
          bottomHeight: parseInt(this.props.popUpHeight),
          visible: true
        })
        break
    }
  }

  startCloseAnimation = () => {
    switch (this.props.animationType) {
      case 'slide':
        setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
          this.setState({
            visible: false
          }, this.closeImmediate)
        }, 100)
        break
      default:
        this.closeImmediate()
    }
  }

  closeImmediate = () => {
    this.props.onRequestClose && this.props.onRequestClose()
    if (this.state.visible) {
      this.setState({
        visible: false
      })
    }
  }

  hide = () => {
    if (this.props.isApi) {
      this.props.closePopUp && this.props.closePopUp()
    } else {
      this.startCloseAnimation()
    }
  }
}

export default MaskWarp(XPopUp)

const styles = StyleSheet.create({
  shareOutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden'
  },
})

