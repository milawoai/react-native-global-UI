import React, {Component} from 'react';
import GlobalPopUp from '../widgets/box/popup/globalPopUp'

export const PopUpBuilder = (modal) => {

  let resultParams = {}

  let warpParams = {}

  let isCustomWrap = false

  const injectParams = function(params) {
    resultParams = Object.assign(resultParams, params);
    return this
  }

  const injectWrapParams = function(params) {
    warpParams = Object.assign(warpParams, params);
    return this
  }

  const declareCustomWrap = function() {
    isCustomWrap = true
    return this
  }

  const show = function() {
    showGlobalPopUp(modal, resultParams,warpParams,isCustomWrap)
  }
  return {
    injectParams,
    injectWrapParams,
    declareCustomWrap,
    show
  }
}

export const CollectionPopUp = () => {
  return PopUpBuilder('CollectionPopUp')
}

const showGlobalPopUp = (PopUp, params, warpParams, isCustomWrap = false) => {
  GlobalPopUp.hidePopup()
  if (isCustomWrap) {
    GlobalPopUp.showWarpedPopup(PopUp, params)
  } else {
    GlobalPopUp.showPopup(PopUp, params, warpParams)
  }
}