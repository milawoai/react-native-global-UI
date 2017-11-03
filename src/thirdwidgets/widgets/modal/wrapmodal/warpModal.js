/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity, Animated, Platform} from 'react-native'
import {px2dp} from "../../../utils/screenUtils"
import links from '../../../res/links'

export default class Xmodal extends Component {

  static propTypes = {
    ...View.propTypes,
    //动画效果：None：没有，slide：底部滑出 (未完成) fade：淡入淡出
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    //是否空出导航栏 （未完成）
    spaceNav: PropTypes.bool,
    //是否背景透明，不妨碍点击 （未完成）
    transparent: PropTypes.bool,
    //关闭监听
    onRequestClose: PropTypes.func,
    //关闭方法
    closePopUp: Platform.OS === 'android' ? PropTypes.func.isRequired :PropTypes.func,
    //是否允许点击背景关闭自己 （未完成）
    bgClose: PropTypes.bool,
    // 背景style，优先度最高
    bgStyle: PropTypes.object,
    // 背景模糊度
    opacity: PropTypes.number,
    // 白色背景
    bgLight: PropTypes.bool,
    // visible
    visible: PropTypes.bool
  }

  static defaultProps = {
    animationType: 'fade',
    opacity: 0.6,
    visible: true
  };

  constructor (props) {
    super(props)
    this.initAnimation()
  }

  componentDidMount() {
    this.startAnimation()
  }

  render () {
    let {transparent, opacity, bgLight, visible} = this.props

    if (!visible) return null

    let animationStyle ={ opacity: this.state.fadeAnima}

    let bgColorStyle = {
      backgroundColor: bgLight? 'white' : 'black',
      opacity: opacity
    }

    let bgView = !transparent?<View style={[styles.container, bgColorStyle, this.props.bgStyle]} />:null
    let children = React.cloneElement(this.props.children, {startCloseAction: this.startCloseAction})

    return (
      <Animated.View style={[styles.container, animationStyle, this.props.style]}>
        {bgView}
        {children}
      </Animated.View>
    )
  }

  initAnimation = () => {
    switch (this.props.animationType) {
        case 'fade':
          this.state = {
            fadeAnima: new Animated.Value(0),  // Initial value for opacity: 0
          }
        break
    } 
  }

  startAnimation = () => {
    switch (this.props.animationType) {
        case 'fade':
          this.startFadeInAnimation()
          break
    }
  }

  startCloseAction = () => {
    switch (this.props.animationType) {
        case 'none':
          this.closeImmidiate()
          break
        case 'fade':
          this.startFadeOutAnimation()
          break
    }
  }

/*
  淡入淡出动画
*/  
  startFadeInAnimation = () => {
    Animated.timing(                  // Animate over time
      this.state.fadeAnima,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 300,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  startFadeOutAnimation = () => {
    Animated.timing(
      this.state.fadeAnima,
      {
        toValue: 0,
        duration: 200,
      }
    ).start(this.closeImmidiate);
  }

  closeImmidiate = () => {
    this.props.closeModal && this.props.closeModal()
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
    alignItems: 'center',
    justifyContent: 'center'
  }
})

