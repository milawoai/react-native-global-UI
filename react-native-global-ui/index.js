/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react'
import emitter from './widgets/rootsiblings/AppRegistryInjection';
import * as Config from './config/config'
import * as CommonStyle from './res/commonStyle'

module.exports = {
  get Alert() {
    return require('./output/alert').alert
  },
  get Loading() {
    return require('./output/loading').Loading
  },
  get LoadingBuilder() {
    return require('./output/loading').LoadingBuilder
  },
  get setLoadingDefaultOptions() {
    return require('./output/loading').setLoadingDefaultOptions
  },
  get HUD() {
    return require('./output/HUD').HUD
  },
  get HUDBuilder() {
    return require('./output/HUD').HUDBuilder
  },
  get setHUDDefaultOptions() {
    return require('./output/HUD').setHUDDefaultOptions
  },
  get ModalBuilder() {
    return require('./output/modal').ModalBuilder
  },
  get commonConfig() {
    return {...Config}
  },
  get commonStyle() {
    return {...CommonStyle}
  },
  get GlobalShower() {
    return require('./output/custom').GlobalShower
  },
  get PopUpBuilder() {
    return require('./output/popup').PopUpBuilder
  },
  get CollectionPopUp() {
    return require('./output/popup').CollectionPopUp
  },
}


//
// export const PopUpBuilder = (modal) => {
//
//   let resultParams = {}
//
//   let warpParams = {}
//
//   let isCustomWrap = false
//
//   const injectParams = function(params) {
//     resultParams = Object.assign(resultParams, params);
//     return this
//   }
//
//   const injectWrapParams = function(params) {
//     warpParams = Object.assign(warpParams, params);
//     return this
//   }
//
//   const declareCustomWrap = function() {
//     isCustomWrap = true
//     return this
//   }
//
//   const show = function() {
//     showGlobalPopUp(modal, resultParams,warpParams,isCustomWrap)
//   }
//   return {
//     injectParams,
//     injectWrapParams,
//     declareCustomWrap,
//     show
//   }
// }
//
// export const CollectionPopUp = () => {
//   return PopUpBuilder('CollectionPopUp')
// }
//
// const showGlobalPopUp = (PopUp, params, warpParams, isCustomWrap = false) => {
//   GlobalPopUp.hidePopup()
//   if (isCustomWrap) {
//     GlobalPopUp.showWarpedPopup(PopUp, params)
//   } else {
//     GlobalPopUp.showPopup(PopUp, params, warpParams)
//   }
// }
//
