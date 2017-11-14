/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity, Animated, Platform} from 'react-native'
import {px2dp} from "../../../utils/screenUtils"
import links from '../../../res/links'
import {MaskWarp} from '../MaskNest'

class WrapModal extends Component {

  static propTypes = {
    ...View.propTypes,
    //动画效果：None：没有，slide：底部滑出 (未完成) fade：淡入淡出
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    //关闭监听
    onElementClose: PropTypes.func,
    //关闭方法
    closePopUp: Platform.OS === 'android' ? PropTypes.func.isRequired :PropTypes.func,
  }

  static defaultProps = {
    animationType: 'fade'
  };

  constructor (props) {
    super(props)
    this.initAnimation()
  }

  componentDidMount() {
    this.startAnimation()
  }

  render () {
    let animationStyle ={ opacity: this.state.fadeAnima}

    let children = React.cloneElement(this.props.children, {startCloseAction: this.startCloseAction})

    return (
      <Animated.View style={[styles.container, animationStyle, this.props.style]}>
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
    this.props.onElementClose && this.props.onElementClose()
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default MaskWarp(WrapModal)

