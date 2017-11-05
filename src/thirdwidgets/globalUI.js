/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';

import GlobalModal from './widgets/modal/globalmodal'
import globalPopUp from './widgets/popup/globalPopUp'
import globalCustom from './widgets/rootsiblings/globalCustom'

import Loading from './widgets/loading/loading'
import HUD from './widgets/hud/hud'


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

const showGlobalModal = (ModalName, params) => {
  GlobalModal.hideModal()
  GlobalModal.showModal(ModalName, params)
}

const showGlobalPopUp = (PopUpName, params, wrapParams) => {
  globalPopUp.hidePopup()
  globalPopUp.showPopup(PopUpName, params, wrapParams)
}

export default {
  showLoading,
  hideLoading,

  showHUD,
  hideHUD,

  showGlobalModal,
  showGlobalPopUp,

  show
}