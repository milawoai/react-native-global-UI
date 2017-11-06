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

import {px2dp} from '../../../utils/screenUtils'

import {MaskWarp} from '../MaskNest'


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
  };

  static defaultProps = {
    loadingText:'加载中...',
    showIndicator: true,
    loadingSize: 'large',
    loadingColor: 'white',
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      loadingText = '加载中...',
      loadingStyle,
      loadingTextStyle,
      contentStyle,
      loadingElem,
      loadingColor,
      loadingSize,
    } = this.props

    return (
      <View style={[defaultStyles.contentStyle, contentStyle]}>
        <ActivityIndicator style={[defaultStyles.loadingStyle, loadingStyle]} size={loadingSize} color={loadingColor}/>
        <Text style={[defaultStyles.loadingTextStyle, loadingTextStyle]}>{loadingText}</Text>
      </View>
    );
  }
}


export default MaskWarp(Loading)