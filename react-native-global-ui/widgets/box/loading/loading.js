'use strict';
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
  ColorPropType
} from 'react-native';

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
    // 提示文案
    loadingText: PropTypes.string,
    // 提示文案Style
    loadingTextStyle: Text.propTypes.style,

    // 提示指示器Style
    indicatorStyle: ViewPropTypes.style,
    // 提示指示器Style
    indicatorSize: PropTypes.oneOfType([
      PropTypes.oneOf([ 'small', 'large' ]),
      PropTypes.number,
    ]),
    // 提示指示器color
    indicatorColor: ColorPropType,

    // 提示背景Style
    contentStyle: ViewPropTypes.style,
    // 提示指示器组件
    customLoadingElem: PropTypes.element,
  };

  static defaultProps = {
    loadingText:'加载中...',
    indicatorSize: 'large',
    indicatorColor: 'white',
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      loadingText = '加载中...',
      indicatorStyle,
      loadingTextStyle,
      contentStyle,
      indicatorColor,
      indicatorSize,
      customLoadingElem
    } = this.props

    if (customLoadingElem) {
      return customLoadingElem
    }

    return (
      <View style={[defaultStyles.contentStyle, contentStyle]}>
        <ActivityIndicator style={[defaultStyles.loadingStyle, indicatorStyle]}
                           size={indicatorSize} color={indicatorColor}/>
        <Text style={[defaultStyles.loadingTextStyle, loadingTextStyle]}>{loadingText}</Text>
      </View>
    );
  }
}

export default MaskWarp(Loading)