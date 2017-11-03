/**
 * Created by ygj on 2017/10/28.
 */
'use strict'

import React, {Component} from 'react';
import {
  TextInput,
  NativeMethodsMixin,
  Platform,
  Keyboard,
  LayoutAnimation
} from 'react-native';

import ReactNative from 'react-native';

let ReactNativeComponentTree = require('ReactNativeComponentTree');

class KeyboardFixInput extends Component {

  constructor(props) {
    super(props);
    this.inputYRegister = {}
    this.keyboardShow = false
  }

  render() {
    return (
      <TextInput {...this.props}
                 onLayout={(e)=>{this.containerLayout(e)}}
                 onFocus = {(e)=>{this.inputFocus(e)}} />
    )
  }

  containerLayout = (e) => {
    if (Platform.OS === 'ios') {
      if (e && e.nativeEvent) {
        let inst = ReactNativeComponentTree.getInstanceFromNode(e.nativeEvent.target);
        let target = e.nativeEvent.target;
        if(!this.props.targetScroll) {
          inst.measure(((x, y, width, height, pageX, pageY) => {
            this.inputYRegister[target] = pageY;
          }));
        } else {
          inst.measureLayout(ReactNative.findNodeHandle(this.props.targetScroll),((x, y, width, height, pageX, pageY) => {
            this.inputYRegister[target] = y ;
          }));
        }
      }
    }
  }

  inputFocus = (e) => {
    if (Platform.OS === 'ios' &&  this.props.targetScroll) {
      let scroller = this.props.targetScroll;
      let target = e.nativeEvent['target'];
      setTimeout(() => {
        let y = this.inputYRegister[target] - 170 > 0 ? this.inputYRegister[target] - 170 : 0;//Dev_height为屏幕的高度
        scroller && scroller.scrollTo({x: 0, y: y, animated: true});
      }, 50);
    }
  }

}

export default KeyboardFixInput;