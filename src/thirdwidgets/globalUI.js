/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';

import globalModal from './widgets/modal/globalModal'
import globalPopUp from './widgets/popup/globalPopUp'
import globalCustom from './widgets/rootsiblings/globalCustom'
import Loading from './widgets/loading/loading'


function showLoading(options) {
  hideLoading()
  show(Loading, options)
}

function hideLoading() {
  globalCustom.hideCustom()
}

const show = (custom, params) => {
  globalCustom.hideCustom()
  globalCustom.showCustom(custom, params)
}

const showGlobalModal = (ModalName, params) => {
  globalModal.hideModal()
  globalModal.showModal(ModalName, params)
}

const showGlobalPopUp = (PopUpName, params, wrapParams) => {
  globalPopUp.hidePopup()
  globalPopUp.showPopup(PopUpName, params, wrapParams)
}

export default {
  showLoading,
  hideLoading,
  showGlobalModal,
  showGlobalPopUp,

  show
}