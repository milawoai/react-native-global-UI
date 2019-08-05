/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';
import RootSiblings from '../../rootsiblings/SiblingsManager'
import WarpPopUp from './warpPopUp'
import CollectionPopUp from './impl/collectionPopUp'
import SheetPopUp from './impl/sheetPopUp'

const Modals = {
  'CollectionPopUp': CollectionPopUp,
  'SheetPopUp': SheetPopUp
}

let rootSiblingInstancePop = ''

const hidePopup = () => {
  if (rootSiblingInstancePop instanceof RootSiblings) {
    rootSiblingInstancePop.destroy();
  } else {
    rootSiblingInstancePop = ''
  }
}

const showWarpedPopup = (PopUP, params) => {
  hidePopup()
  if (typeof PopUP === 'string') {
    PopUP = Modals[PopUP];
  }
  if (!PopUP) return
  let fixParams = Object.assign({},{closeModal: hidePopup}, params)
  const renderContent = PopUP?(
    <PopUP {...fixParams} />
  ):null
  rootSiblingInstancePop = new RootSiblings(renderContent)
  return rootSiblingInstancePop
}

const showPopup = (PopUP, params, warpParams) => {
  hidePopup()

  if (typeof PopUP === 'string') {
    PopUP = Modals[PopUP];
  }
  if (!PopUP) return
  let fixWarpParams = Object.assign({},{closePopUp: hidePopup}, warpParams)
  let fixParams = Object.assign({}, {closePopUp: hidePopup},{style: {alignSelf: 'stretch', flex: 1}}, params)
  const renderContent = PopUP ?
    (
      <WarpPopUp {...fixWarpParams}>
        <PopUP {...fixParams } />
      </WarpPopUp>
    )
  :null
  rootSiblingInstancePop = new RootSiblings(renderContent)
  return rootSiblingInstancePop;
}

export default {
  hidePopup,
  showPopup,
  showWarpedPopup
}