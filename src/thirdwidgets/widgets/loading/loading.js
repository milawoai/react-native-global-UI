'use strict';
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native';

const ViewPropTypes = require('ViewPropTypes');
const ColorPropType = require('ColorPropType');

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
    minHeight:  px2dp(180),
    padding: px2dp(30),
    alignSelf:'center'
  },
  noMaskPosition: {
    position: 'absolute',
    top: `50%`,
    left: `50%`
  },
  loadingTextStyle: {
    fontSize:18,
    textAlign:'center',
    color:'white',
    margin:15,
    marginTop:px2dp(10)
  },
  loadingStyle: {
    width: px2dp(100),
    height: px2dp(100),
    opacity: 1.0
  }
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

// 完成了full， block， 差none

class Loading extends Component {

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
    // 提示文案
    loadingText: PropTypes.string,
    // 提示文案Style
    loadingTextStyle: Text.propTypes.style,
    // 提示指示器Style
    loadingStyle: ViewPropTypes.style,
    // 提示指示器Style
    loadingSize: PropTypes.oneOfType([
      PropTypes.oneOf([ 'small', 'large' ]),
      PropTypes.number,
    ]),
    // 提示指示器color
    loadingColor: ColorPropType,
    // 提示指示器组件
    loadingElem: PropTypes.element,
    // 提示背景Style
    contentStyle: ViewPropTypes.style,
    // mask背景Style
    maskStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    loadingText:'加载中...',
    showIndicator: true,
    maskType: 'full',
    loadingSize: 'large',
    loadingColor: 'white',
    blockHeight: APPBAR_HEIGHT+STATUSBAR_HEIGHT
  }

  state = this.initState(this.props)

  constructor(props) {
    super(props);
  }

  initState = (props) => {
    let state = {
      showIndicator: props.showIndicator,
      contentX: 0,
      contentY: 0
    }
    return state
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this.initState(nextProps))
  }

  render() {
    const {
      showIndicator
    } = this.state

    const {
      loadingText = '加载中...',
      loadingStyle,
      loadingTextStyle,
      contentStyle,
      maskStyle,
      loadingElem,
      loadingColor,
      loadingSize,
      maskType,
      blockHeight
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

    if (!showIndicator) return null

    let HUD = (
      <View style={contentStyles} onLayout={({nativeEvent:e})=>this.layout(e)}>
        <ActivityIndicator style={defaultStyles.loadingStyle} size={loadingSize} color={loadingColor}/>
        <Text style={[defaultStyles.loadingTextStyle, loadingTextStyle]}>{loadingText}</Text>
      </View>
    );

    let HUDWithMask = HUD

    if (maskType === 'full') {
      HUDWithMask = (
        <View style={[bgStyle, alignCenterStyle]}>
          <View style={[bgStyle, {backgroundColor:'black',opacity:0.1} ,maskStyle]} />
          {HUD}
        </View>
      )
    } else if (maskType === 'block'){
      HUDWithMask = (
        <View style={[bgStyle, {marginTop: blockHeight}, alignCenterStyle]}>
          <View style={[bgStyle, {backgroundColor:'black',opacity:0.1}, maskStyle]} />
          {HUD}
        </View>
      )
    }

    return  HUDWithMask;
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

}



export default Loading