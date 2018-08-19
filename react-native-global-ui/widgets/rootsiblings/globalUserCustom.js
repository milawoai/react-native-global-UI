/**
 * Created by ygj on 2017/11/2.
 */
/**
 * Created by ygj on 2017/8/9.
 */
import React from 'react';
import RootSiblings from './SiblingsManager'

let rootSiblingInstanceUserCustom = ''

const hideUserCustom = () => {
  if (rootSiblingInstanceUserCustom instanceof RootSiblings) {
    rootSiblingInstanceUserCustom.destroy();
  } else {
    rootSiblingInstanceUserCustom = ''
  }
}

const showUserCustom = (Custom, params = {}) => {
  hideUserCustom()
  if (!Custom) return
  let fixParams = Object.assign(params, {
    hide: hideUserCustom
  })
  const renderContent = Custom ? <Custom {...fixParams } /> : null
  rootSiblingInstanceUserCustom = new RootSiblings(renderContent)
  return rootSiblingInstanceUserCustom
}

export default {
  hideUserCustom,
  showUserCustom
}