/**
 * Created by ygj on 2017/11/5.
 */
'use strict';
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  Platform,
  ViewPropTypes,
  ColorPropType,
  Dimensions
} from 'react-native';


import {icon_success_HUD, icon_error_HUD} from '../../../res/links'
import {bgStyle, alignCenterStyle} from '../../../res/commonStyle'
import {px2dp} from '../../../utils/screenUtils'

import {MaskWarp} from '../MaskNest'

const {width, height} = Dimensions.get('window')

const defaultStyles = {
  contentStyle: {
    backgroundColor:'black',
    borderRadius: 10,
    opacity: 0.7,
    alignItems: 'center',
    minWidth: px2dp(180),
    minHeight: px2dp(180),
    padding: px2dp(30),
    alignSelf:'center'
  },
  noMaskPosition: {
    position: 'absolute',
    top: `50%`,
    left: `50%`
  },
  hudTextStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    margin: 15,
    marginTop: px2dp(30)
  },
  hintImage: {
    marginTop: 15,
    width: px2dp(100),
    height: px2dp(100)
  }
}

class HUD extends Component {

  static propTypes = {
    // 是否展示
    showIndicator: PropTypes.bool,
    hintType: PropTypes.oneOf([
      'success',
      'fail',
      'custom'
    ]),
    // 提示文案
    hudText: PropTypes.string,
    // 提示文案Style
    hudTextStyle: Text.propTypes.style,
    // 提示背景Style
    contentStyle: ViewPropTypes.style,
    // 指定提示地址
    customImageSource: PropTypes.object,
    // 提示Image style
    hintImageStyle: ColorPropType,

    //消失时间
    disappearTime: PropTypes.number,

    // 提示HUD组件
    customHUDElem: PropTypes.element,

    hide: PropTypes.func,
    onHide: PropTypes.func
  };

  static defaultProps = {
    showIndicator: true,
    hintType: 'success',
    disappearTime: 2000
  }


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.showIndicator) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    let {
      hudText,
      hudTextStyle,
      contentStyle,
      hintType,
      customHUDElem
    } = this.props

    if (!hudText) {
      switch (hintType) {
        case 'success':
          hudText = '加载成功'
          break
        case 'fail':
          hudText = '加载失败'
          break
      }
    }

    if (customHUDElem) {
      return customHUDElem
    }

    return (
      <View style={[defaultStyles.contentStyle, contentStyle]}>
        {
          this.renderHUD()
        }
        <Text style={[defaultStyles.hudTextStyle, hudTextStyle]}>{hudText}</Text>
      </View>
    )
  }
  
  renderHUD = () => {
    const {
      hintImageStyle,
      hintType,
      customImageSource
    } = this.props


    let hudHintImage = icon_success_HUD
    switch (hintType) {
      case 'success':
        hudHintImage = icon_success_HUD
        break
      case 'fail':
        hudHintImage = icon_error_HUD
        break
      case 'custom':
        hudHintImage = customImageSource
        break
    }

    return (
      <Image resizeMode='stretch'
             style={[defaultStyles.hintImage, hintImageStyle]}
             source={hudHintImage} />
    )
  }

  show = () => {
    this.setState({
      showIndicator: true
    }, this.startTimer)
  }


  startTimer = () => {
    this.HUDTimer = setTimeout(
      this.hidden,
      this.props.disappearTime
    );
  }

  hidden = () =>{
    let self = this;
    self.setState({
      showIndicator: false
    });
    this.props.hide && this.props.hide()
    this.props.onHide && this.props.onHide()
    self.stopTimer();
  }

  stopTimer() {
    let self = this;
    self.HUDTimer && clearTimeout(self.HUDTimer);
  }
}

export default MaskWarp(HUD)