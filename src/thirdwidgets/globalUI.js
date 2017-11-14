/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';

import GlobalModal from './widgets/box/modal/globalmodal'
import globalPopUp from './widgets/box/popup/globalPopUp'
import globalCustom from './widgets/rootsiblings/globalCustom'

import Loading from './widgets/box/loading/loading'
import HUD from './widgets/box/hud/hud'


const showLoading = (options) => {
  hideLoading()
  show(Loading, options)
}

function hideLoading() {
  globalCustom.hideCustom()
}

const showHUD = (options) => {
  hideLoading()
  show(HUD, options)
}

function hideHUD() {
  globalCustom.hideCustom()
}

const show = (custom, params) => {
  globalCustom.hideCustom()
  globalCustom.showCustom(custom, params)
}

const showGlobalPopUp = (PopUp, params, wrapParams) => {
  globalPopUp.hidePopup()
  globalPopUp.showPopup(PopUp, params, wrapParams)
}

const ModalBuilder = (modal) => {

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

export default {
  showLoading,
  hideLoading,

  showHUD,
  hideHUD,

  showGlobalModal,
  showGlobalPopUp,

  ModalBuilder
}