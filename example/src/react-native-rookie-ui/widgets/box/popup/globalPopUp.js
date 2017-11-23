/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';
import RootSiblings from '../../rootsiblings/SiblingsManager'
import WarpPopUp from './wrappopup/warpPopUp'


let rootSiblingInstancePop = ''

const hidePopup = () => {
  if (rootSiblingInstancePop instanceof RootSiblings) {
    rootSiblingInstancePop.destroy();
  } else {
    rootSiblingInstancePop = ''
  }
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
  showPopup
}