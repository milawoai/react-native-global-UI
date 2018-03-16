/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import LoadingComponent from '../widgets/box/loading/loading'
import GlobalCustom from '../widgets/rootsiblings/globalCustom'

const showLoading = (custom, params) => {
  GlobalCustom.hideCustom()
  GlobalCustom.showCustom(custom, params)
}

export const Loading = {
  show: (options) => {
    GlobalCustom.hideCustom()
    showLoading(LoadingComponent, options)
  },
  hide: GlobalCustom.hideCustom
}

export const LoadingBuilder = () => {

  let resultParams = {}
  let maskParams = {}
  let indicateParams = {}

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

  /*
  * / 提示指示器Style
    indicatorStyle: ViewPropTypes.style,
    // 提示指示器Style
    indicatorSize: PropTypes.oneOfType([
      PropTypes.oneOf([ 'small', 'large' ]),
      PropTypes.number,
    ]),
    // 提示指示器color
    indicatorColor: ColorPropType,

  *
  * */

  const injectIndicateParams = function(indicateParams) {
    injectParams(indicateParams)
    return this
  }


  const setMaskType =  function(maskType) {
    if (maskType && typeof maskType === 'string')
    maskParams.maskType = maskType
    return this
  }

  const setLoadingText =  function(text) {
    resultParams.loadingText = text
    return this
  }

  const setLoadingTextStyle =  function(loadingTextStyle) {
    resultParams.loadingTextStyle = loadingTextStyle
    return this
  }

  const setContentStyle = function (style) {
    resultParams.contentStyle = style
  }

  const setCustomLoading =  function(customLoadingElem) {
    resultParams.customLoadingElem = customLoadingElem
    return this
  }
  
  const show = function() {
    showLoading(LoadingComponent, {...resultParams, ...maskParams, ...indicateParams })
  }

  return {
    injectParams,
    injectMaskParams,
    injectIndicateParams,
    setMaskType,
    setLoadingText,
    setLoadingTextStyle,
    setCustomLoading,
    setContentStyle,
    show
  }
}
