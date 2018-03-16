
/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';
import GlobalModal from '../widgets/box/modal/globalModal'


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