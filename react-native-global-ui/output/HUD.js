/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import HUDComponent from '../widgets/box/hud/hud'
import GlobalCustom from '../widgets/rootsiblings/globalCustom'

const showHUD = (custom, params) => {
  GlobalCustom.hideCustom()
  GlobalCustom.showCustom(custom, params)
}


let successOptions = {}
let failOptions = {}

export const setHUDDefaultOptions = (type, options) => {
  if (type === 'success') {
    successOptions = {...successOptions, ...options}
  } else if (type === 'fail') {
    successOptions = {...failOptions, ...options}
  }
}

export const HUD = {
  show: (options) => {
    GlobalCustom.hideCustom()
    showHUD(HUDComponent, options)
  },
  showSuccess: (options) => {
    GlobalCustom.hideCustom()
    let showOption = Object.assign({}, options, {hintType: 'success'} )
    showHUD(HUDComponent, {...successOptions, ...showOption})
  },
  showFail: (options) => {
    GlobalCustom.hideCustom()
    let showOption = Object.assign({}, options, {hintType: 'fail'})
    showHUD(HUDComponent, {...failOptions, ...showOption})
  },
  hide: GlobalCustom.hideCustom
}


export const HUDBuilder = () => {

  let resultParams = {}
  let maskParams = {}

  const injectParams = function(params) {
    resultParams = Object.assign(resultParams, params);
    return this
  }
  /*
  *
  *  //使用遮罩
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

  * */
  const injectMaskParams = function(params) {
    function correct(actual, fixed) {
      if (!params[fixed] && params[actual]) {
        params[fixed] = params[actual]
        delete params[actual]
      }
    }
    correct('style', 'maskStyle')
    maskParams = Object.assign(maskParams, params);
    return this
  }

  const setMaskType =  function(maskType) {
    if (maskType && typeof maskType === 'string')
      maskParams.maskType = maskType
    return this
  }

  const setHintType =  function(hintType) {
    resultParams.hintType = hintType
    return this
  }

  const setHudText =  function(hudText) {
    resultParams.hudText = hudText
    return this
  }

  const setHudTextStyle =  function(hudTextStyle) {
    resultParams.hudTextStyle = hudTextStyle
    return this
  }

  const setContentStyle = function (style) {
    resultParams.contentStyle = style
    return this
  }

  const setDisappearTime =  function(disappearTime) {
    resultParams.disappearTime = disappearTime
    return this
  }

  const setOnHide =  function(onHide) {
    resultParams.onHide = onHide
    return this
  }

  const setCustomHUDElem =  function(customHUDElem) {
    resultParams.customHUDElem = customHUDElem
    return this
  }

  const show = function() {
    showHUD(HUDComponent, {...resultParams, ...maskParams })
  }

  const showSuccess = function() {
    if (!resultParams) resultParams = {}
    resultParams.hintType = 'success'
    showHUD(HUDComponent, {...resultParams, ...maskParams })
  }

  const showFail = function() {
    if (!resultParams) resultParams = {}
    resultParams.hintType = 'fail'
    showHUD(HUDComponent, {...resultParams, ...maskParams })
  }

  return {
    injectParams,
    injectMaskParams,
    setMaskType,
    setHintType,
    setHudText,
    setHudTextStyle,
    setDisappearTime,
    setOnHide,
    setContentStyle,
    setCustomHUDElem,
    show,
    showSuccess,
    showFail
  }
}