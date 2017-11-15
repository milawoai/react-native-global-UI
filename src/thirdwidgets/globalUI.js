/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';

import GlobalAlert from './widgets/box/alert/globalAlert'
import GlobalModal from './widgets/box/modal/globalModal'
import globalPopUp from './widgets/box/popup/globalPopUp'
import GlobalCustom from './widgets/rootsiblings/globalCustom'

import LoadingComponet from './widgets/box/loading/loading'
import HUDComponet from './widgets/box/hud/hud'


export const Alert = {
  alert: (
    title,
    message,
    callbackOrButtons,
    styleConfig,
    wrapStyle
  ) => {
    GlobalAlert.hideAlert()
    GlobalAlert.showAlert(
      title,
      message,
      callbackOrButtons,
      styleConfig,
      wrapStyle
    )
  },
  hide: GlobalAlert.hideAlert
}

const show = (custom, params) => {
  GlobalCustom.hideCustom()
  GlobalCustom.showCustom(custom, params)
}

export const Loading = {
  show: (options) => {
    GlobalCustom.hideCustom()
    show(LoadingComponet, options)
  },
  hide: GlobalCustom.hideCustom
}

export const HUD = {
  show: (options) => {
    GlobalCustom.hideCustom()
    show(HUDComponet, options)
  },
  showSuccess: (options) => {
    GlobalCustom.hideCustom()
    let showOpiton = Object.assign({}, options, {hintType: 'success'} )
    show(HUDComponet, showOpiton)
  },
  showFail: (options) => {
    GlobalCustom.hideCustom()
    let showOpiton = Object.assign({}, options, {hintType: 'fail'})
    show(HUDComponet, showOpiton)
  },
  hide: GlobalCustom.hideCustom
}

export const ModalBuilder = (modal) => {

  let resultParams = {}

  let isCustomWrap = false

  const injectParams = function(params) {
    resultParams = Object.assign(resultParams, params);
    return this
  }

  const declareCustomWrap = function() {
    isCustomWrap = true
    return this
  }

  const show = function() {
    showGlobalModal(modal, resultParams, isCustomWrap)
  }

  const test = function() {
    console.warn(JSON.stringify(resultParams))
  }

  return {
    injectParams,
    declareCustomWrap,
    show,
    test
  }
}

const showGlobalModal = (Modal, params, isCustomWrap = false) => {
  GlobalModal.hideModal()
  if (isCustomWrap) {
    GlobalModal.showWarpedModal(Modal, params)
  } else {
    GlobalModal.showModal(Modal, params)
  }
}

const showGlobalPopUp = (PopUp, params, wrapParams) => {
  globalPopUp.hidePopup()
  globalPopUp.showPopup(PopUp, params, wrapParams)
}

