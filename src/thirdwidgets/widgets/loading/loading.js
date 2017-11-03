'use strict';
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

const ViewPropTypes = require('ViewPropTypes');
const ColorPropType = require('ColorPropType');

import {bgStyle, alignCenterStyle} from '../../res/commonStyle'
import {px2dp} from '../../utils/screenUtils'


let Dimensions = require('Dimensions');
let ScreenWidth = Dimensions.get('window').width;

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
    // 提示文案
    loadingText: PropTypes.string,
    // 提示文案Style
    loadingTextStyle: PropTypes.style,
    // 提示指示器Style
    loadingStyle: PropTypes.style,
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
    loadingColor: 'white'
  }

  constructor(props) {
    super(props);
    this.state = Object.assign({},{
      maskScreen: true
    },props);
  }

  componentWillUnmount() {
    let self = this;
    self.stopTimer();
  }

  render() {

    const {
      showIndicator,
      loadingText = '加载中...',
      loadingStyle,
      loadingTextStyle,
      contentStyle,
      maskStyle,
      loadingElem,
      loadingColor,
      loadingSize
    } = this.props

    if (!showIndicator) return null

    let self = this;

    let HUD = (
      <View style={[defaultStyles.contentStyle, contentStyle]}>
        <ActivityIndicator style={defaultStyles.loadingStyle} size={loadingSize} color={loadingColor}/>
        <Text style={[defaultStyles.loadingTextStyle, loadingTextStyle]}>{loadingText}</Text>
      </View>
    );

    let HUDWithMask = self.state.maskScreen?(
      <View style={[bgStyle, alignCenterStyle]}>
        <View style={[bgStyle, {backgroundColor:'white',opacity:0.1}]} />
        {HUD}
      </View>
    ):HUD;

    return  HUDWithMask;
  }

  show(states){
    let self = this;
    self.setState({
      showIndicator: true,
      maskScreen:true,
      ...states
    });
    if(self.state.dismissSelf) {
      self.HUDTimer = setTimeout(
        () => {
          self.hidden();
        },
        2000
      );
    }
  }

  showLoading(hintText = null){
    let self = this;
    self.setState({
      showIndicator: true,
      loadingText:hintText?hintText:'加载中...',
      hintFontSize: 18,
      hintType:CustomHUD.HUDType.HUDLoading, //0,Loading; 1, Success; 2, failure
      maskScreen:true, //遮挡屏幕，防止点击
      dismissSelf:false
    });
  }


  showSuccess(hintText = null){
    let self = this;
    self.setState({
      showIndicator: true,
      loadingText:hintText?hintText:'请求成功',
      hintFontSize: 18,
      hintType:CustomHUD.HUDType.HUDSuccess, //0,Loading; 1, Success; 2, failure
      maskScreen:true, //遮挡屏幕，防止点击
      dismissSelf:false
    });
    self.HUDTimer = setTimeout(
      () => {
        self.hidden();
      },
      2000
    );
  }

  showError(hintText = null){
    let self = this;
    self.setState({
      showIndicator: true,
      loadingText:hintText?hintText:'请求失败',
      hintFontSize: 18,
      hintType:CustomHUD.HUDType.HUDSuccess, //0,Loading; 1, Success; 2, failure
      maskScreen:true, //遮挡屏幕，防止点击
      dismissSelf:false
    });
    self.HUDTimer = setTimeout(() => {self.hidden();},2000);
  }

  hidden(){
    let self = this;
    self.setState({
      showIndicator: false,
      loadingText:'加载中...',
      hintFontSize: 18,
      hintType:CustomHUD.HUDType.HUDLoading, //0,Loading; 1, Success; 2, failure
      maskScreen:false, //遮挡屏幕，防止点击
      dismissSelf:false
    });
    self.stopTimer();
  }

  stopTimer() {
    let self = this;
    self.HUDTimer && clearTimeout(self.HUDTimer);
  }
}



export default Loading