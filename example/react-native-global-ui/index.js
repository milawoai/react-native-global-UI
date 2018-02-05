/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import GlobalAlert from './widgets/box/alert/globalAlert'
import GlobalModal from './widgets/box/modal/globalModal'
import GlobalPopUp from './widgets/box/popup/globalPopUp'
import GlobalCustom from './widgets/rootsiblings/globalCustom'

import LoadingComponent from './widgets/box/loading/loading'
import HUDComponent from './widgets/box/hud/hud'

import * as Config from './config/config'
import * as CommonStyle from './res/commonStyle'

/* Alert 
callbackOrButtons : {
  text,
  onPress,
  containerStyle,
  textStyle
}
*/

export const commonConfig = {
  ...Config
}

export const commonStyle = {
  ...CommonStyle
}

export const Alert = {
  alert: (
    title,
    message,
    callbackOrButtons,
    styleConfig,
    wrapStyle
  ) => {
    let alertConfig = GlobalAlert.getAlertConfig()
    GlobalAlert.hideAlert()
    GlobalAlert.showAlert(
      title,
      message,
      callbackOrButtons,
      Object.assign({}, styleConfig, alertConfig.styleConfig),
      Object.assign({}, wrapStyle, alertConfig.wrapStyle)
    )
  },
  alertCancelConfirm: (
    title,
    message,
      {
        cancelConfig,
        confirmConfig,
        reserve
      },
    wrapStyleConfig
  ) => {
    let alertConfig = GlobalAlert.getAlertConfig()
    cancelConfig = Object.assign({}, alertConfig? alertConfig.cancelConfig :{} , cancelConfig)
    confirmConfig = Object.assign({}, alertConfig? alertConfig.confirmConfig :{} , confirmConfig)

    if (!cancelConfig) {
      cancelConfig = {
        text: '取消'
      }
    }
    if (!confirmConfig) {
      cancelConfig = {
        text: '确认'
      }
    }

    GlobalAlert.hideAlert()
    let callbackOrButtons = [
      cancelConfig,
      {
        text: '确认退款',
        onPress: () => {
          handleConfirm()
        },
        textStyle: confirmTextStyle,
        containerStyle: confirmTextStyle
      }
    ]
    GlobalAlert.showAlert(
      title,
      message,
      callbackOrButtons,
      alertConfig.styleConfig,
      wrapStyleConfig ? wrapStyleConfig: alertConfig.wrapStyleConfig
    )
  },
  setDefaultConfig : (configKey, configValue) => {
    let newConfig = {}
    newConfig[configKey] = configValue
    GlobalAlert.setAlertConfig(newConfig)
  },
  hide: GlobalAlert.hideAlert
}


/**************

Loading
*/

const show = (custom, params) => {
  GlobalCustom.hideCustom()
  GlobalCustom.showCustom(custom, params)
}

export const Loading = {
  show: (options) => {
    GlobalCustom.hideCustom()
    show(LoadingComponent, options)
  },
  hide: GlobalCustom.hideCustom
}

export const HUD = {
  show: (options) => {
    GlobalCustom.hideCustom()
    show(HUDComponent, options)
  },
  showSuccess: (options) => {
    GlobalCustom.hideCustom()
    let showOption = Object.assign({}, options, {hintType: 'success'} )
    show(HUDComponent, showOption)
  },
  showFail: (options) => {
    GlobalCustom.hideCustom()
    let showOption = Object.assign({}, options, {hintType: 'fail'})
    show(HUDComponent, showOption)
  },
  hide: GlobalCustom.hideCustom
}

export const ModalBuilder = (modal) => {

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
    showGlobalModal(modal, resultParams, warpParams, isCustomWrap)
  }

  return {
    injectParams,
    injectWrapParams,
    declareCustomWrap,
    show
  }
}

const showGlobalModal = (Modal, params, warpParams, isCustomWrap = false) => {
  GlobalModal.hideModal()
  if (isCustomWrap) {
    GlobalModal.showWarpedModal(Modal, params, warpParams)
  } else {
    GlobalModal.showModal(Modal, params)
  }
}

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

