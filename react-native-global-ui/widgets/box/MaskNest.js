/**
 * Created by ygj on 2017/11/5.
 */

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  ViewPropTypes,
  ColorPropType,
  ReactNativeComponentTree,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Button from '../button/button'


import {bgStyle, alignCenterStyle} from '../../res/commonStyle'

const defaultStyles = {
  noMaskPosition: {
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    opacity: '0.01'
  }
}

const {width, height} = Dimensions.get('window')

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export const MaskWarp = (SubView, maskConfig) => {
  class MaskWarpView extends Component {

    static propTypes = {
      // 是否展示
      showIndicator: PropTypes.bool,
      //使用遮罩
      maskType: PropTypes.oneOf([
        'none',
        'block',//不阻挡nav
        'full',
      ]),
      //距离顶部高度
      blockHeight: PropTypes.number,
      // mask背景Style
      maskStyle: ViewPropTypes.style,
      //是否允许点击背景关闭自己
      bgClose: PropTypes.bool,
      opacity:  PropTypes.number,
    };

    static defaultProps = {
      showIndicator: true,
      maskType: 'full',
      blockHeight: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
      opacity: 0.3
    }

    initState = (props) => {
      let resultState = {
        showIndicator: props.showIndicator
      }
      if (props.maskType === 'none') {
        resultState = Object.assign(resultState,
          {
            centerOpacity: 0,
            contentX: 0,
            contentY: 0
          })
      }
      return resultState
    }

    state = this.initState(this.props)

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      setTimeout(() => {
        this.setContentXY()
      }, 50)
    }

    componentWillReceiveProps(nextProps) {
      this.setState(this.initState(nextProps))
    }

    render() {

      const {showIndicator} = this.state

      let maskConfigs = Object.assign({}, maskConfig, this.props)

      const {
        maskStyle,
        maskType,
        blockHeight,
        contentStyle,
        opacity,
        bgClose
      } = maskConfigs

      if (!showIndicator) return null

      let finalContentStyle = {}
      if (maskType === 'block') {
        finalContentStyle = Object.assign(
          finalContentStyle,
          {
            position: 'relative',
            top: -1 * Number(blockHeight)
          }
        )
      }
      finalContentStyle = Object.assign(
        finalContentStyle,
        contentStyle
      )

      let injectProps = Object.assign(this.props, {contentStyle: finalContentStyle})

      let MaskedUI = null

      let maskUI = (
        <View style={[bgStyle, {backgroundColor: 'black', opacity: opacity}, maskStyle]}/>
      )
      if (bgClose) {
        maskUI = (
          <TouchableOpacity  onPress={this.handleHide} style={[bgStyle, {backgroundColor: 'black', opacity: opacity}, maskStyle]} />
        )
      }

      if (maskType === 'full') {
        MaskedUI = (
          <View style={[bgStyle, alignCenterStyle]}>
            {maskUI}
            <SubView {...injectProps} ref = 'subView'/>
          </View>
        )
      } else if (maskType === 'block') {
        MaskedUI = (
          <View style={[bgStyle, {marginTop: blockHeight}, alignCenterStyle]}>
            {maskUI}
            <SubView {...injectProps} ref = 'subView'/>
          </View>
        )
      } else if (maskType === 'none') {
        let noMaskContentStyle = Object.assign({}, defaultStyles.noMaskPosition,
          {
            left: (width - this.state.contentX) / 2,
            top: (height - this.state.contentY) / 2,
            opacity: this.state.centerOpacity
          }
        )

        MaskedUI = (
          <View  ref={(r)=>{this.subView = r}} style = {noMaskContentStyle}>
            <SubView {...injectProps} />
          </View>
        )
      } else {
        console.warn('设置MaskType出错，现在支持 （full， block， none）')
      }
      return MaskedUI;
    }

    handleHide = () => {
      this.refs.subView &&  this.refs.subView.hide &&  this.refs.subView.hide()
    }

    setContentXY = () => {
      if (!this.subView) return
      let self = this
      this.subView.measure(
        (x, y, width, height, pageX, pageY) => {
          self.setState({
            contentX: width,
            contentY: height,
            centerOpacity: 1
          })
        }
      )
    }
  }

  return MaskWarpView
}
