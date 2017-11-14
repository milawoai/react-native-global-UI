/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';
import RootSiblings from '../../rootsiblings/SiblingsManager'
import AdModal from './impl/adModal'
import WrapModal from './wrapModal'

const Modals = {
  'AdModal': AdModal
}

let rootSiblingInstanceModal = ''

const hideModal = () => {
  if (rootSiblingInstanceModal instanceof RootSiblings) {
    rootSiblingInstanceModal.destroy();
  } else {
    rootSiblingInstanceModal = ''
  }
}

const showWarpedModal = (Modal, params) => {
  hideModal()
  if (typeof Modal === 'string') {
    Modal = Modals[Modal];
  }
  if (!Modal) return
  let fixParams = Object.assign({},{closeModal: hideModal}, params)
  const renderContent = Modal?(
    <Modal {...fixParams } />
  ):null
  rootSiblingInstanceModal = new RootSiblings(renderContent)
  return rootSiblingInstanceModal
}

const showModal = (Modal, params, warpParams) => {
  hideModal()
  if (typeof Modal === 'string') {
    Modal = Modals[Modal];
  }
  if (!Modal) return
  let fixWarpParams = Object.assign({},{closeModal: hideModal}, warpParams)
  let fixParams = Object.assign({},{closeModal: hideModal}, params)
  const renderContent = Modal?(
    <WrapModal {...fixWarpParams}>
      <Modal {...fixParams } />
    </WrapModal>
  ):null
  rootSiblingInstanceModal = new RootSiblings(renderContent)
  return rootSiblingInstanceModal
}

export default {
    hideModal,
    showModal,
    showWarpedModal
}