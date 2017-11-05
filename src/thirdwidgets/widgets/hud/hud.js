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
  Platform
} from 'react-native';

const ViewPropTypes = require('ViewPropTypes');
const ColorPropType = require('ColorPropType');

import {icon_success_HUD, icon_error_HUD} from '../../res/links'
import {bgStyle, alignCenterStyle} from '../../res/commonStyle'
import {px2dp} from '../../utils/screenUtils'


let Dimensions = require('Dimensions');
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

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

// 完成了full， block， 差none

export default class HUD extends Component {

  static propTypes = {
    // 是否展示
    showIndicator: PropTypes.bool,
    //使用遮罩
    maskType: PropTypes.oneOf([
      'none',
      'block',//不阻挡nav
      'full',
    ]),
    hintType:  PropTypes.oneOf([
      'success',
      'fail',
      'custom'
    ]),
    //距离顶部高度
    blockHeight: PropTypes.number,
    // 提示文案
    hudText: PropTypes.string,
    // 提示文案Style
    hudTextStyle: Text.propTypes.style,
    // 提示背景Style
    contentStyle: ViewPropTypes.style,
    // mask背景Style
    maskStyle: ViewPropTypes.style,
    // 指定提示地址
    customImageSource: PropTypes.object,
    // 提示Image style
    hintImageStyle: ColorPropType,

    //消失时间
    disappearTime:  PropTypes.number,

    hide: PropTypes.func
  };

  static defaultProps = {
    showIndicator: true,
    maskType: 'none',
    hintType: 'success',
    blockHeight: APPBAR_HEIGHT+STATUSBAR_HEIGHT,
    disappearTime: 2000
  }

  initState = (props) => {
    return  {
      showIndicator: props.showIndicator,
      contentX: 0,
      contentY: 0
    }
  }

  state = this.initState(this.props)

  constructor(props) {
    super(props);
    this.initState(props)
  }

  componentWillMount() {
    if (this.props.showIndicator) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.initState(nextProps))
  }
  
  render() {
    const {showIndicator} = this.state
    if (!showIndicator) return null

    const {
      maskStyle,
      maskType,
      blockHeight
    } = this.props

    let resultUI = this.renderContent()

    if (maskType === 'full') {
      resultUI = (
        <View style={[bgStyle, alignCenterStyle]}>
          <View style={[bgStyle, {backgroundColor:'black',opacity:0.1} ,maskStyle]} />
          {resultUI}
        </View>
      )
    } else if (maskType === 'block'){
      resultUI = (
        <View style={[bgStyle, {marginTop: blockHeight}, alignCenterStyle]}>
          <View style={[bgStyle, {backgroundColor:'black',opacity:0.1}, maskStyle]} />
          {resultUI}
        </View>
      )
    }

    return resultUI;
  }
  
  
  renderContent = () => {
    let {
      hudText,
      hudTextStyle,
      contentStyle,
      maskType,
      blockHeight,
      hintType
    } = this.props

    let contentStyles = [defaultStyles.contentStyle]
    if (maskType === 'block') {
      contentStyles.push({position: 'relative', top: -1 * Number(blockHeight)})
    } else if (maskType === 'none'){
      contentStyles.push(defaultStyles.noMaskPosition, {
        left: (width - this.state.contentX) / 2,
        top: (height - this.state.contentY) / 2
      })
    }
    contentStyles.push(contentStyle)

    if (!hudText) {
      switch (hintType) {
        case 'success':
          hudText = '加载成功'
          break
        case 'fail':
          hudText = '加载失败'
          break
        case 'custom':
          console.warn(`hintType 为 custom 时，请设置提示文字hudText`)
          break
      }
    }

    return (
      <View style={contentStyles} onLayout={({nativeEvent:e})=>this.layout(e)}>
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

  layout = (e) => {
    const threshold = 10
    if (e && e.layout && (
      Math.abs(e.layout.x - this.state.contentX)  > threshold ||
      Math.abs(e.layout.y - this.state.contentY > threshold) )) {
      this.setState({
        contentX: e.layout.x,
        contentY: e.layout.y
      })
    }
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
    self.stopTimer();
  }

  stopTimer() {
    let self = this;
    self.HUDTimer && clearTimeout(self.HUDTimer);
  }
}
