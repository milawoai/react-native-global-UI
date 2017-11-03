/**
 * Created by ygj on 2017/11/2.
 */
/**
 * Created by ygj on 2017/8/9.
 */
import React from 'react';
import RootSiblings from './SiblingsManager'

let rootSiblingInstanceCustom = ''

const hideCustom = () => {
  if (rootSiblingInstanceCustom instanceof RootSiblings) {
    rootSiblingInstanceCustom.destroy();
  } else {
    rootSiblingInstanceCustom = ''
  }
}

const showCustom = (Custom, params = {}) => {
  hideCustom()
  if (!Custom) return
  let fixParams = Object.assign(params, {
    onRequestClose: hideCustom
  })
  const renderContent = Custom ? <Custom {...fixParams } /> : null
  rootSiblingInstanceCustom = new RootSiblings(renderContent)
  return rootSiblingInstanceCustom
}

export default {
  hideCustom,
  showCustom
}