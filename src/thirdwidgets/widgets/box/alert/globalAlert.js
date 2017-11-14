/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';
import RootSiblings from '../../rootsiblings/SiblingsManager'
import Alert from './impl/Alert'

let rootSiblingInstanceAlert = ''

const hideAlert = () => {
  if (rootSiblingInstanceAlert instanceof RootSiblings) {
    rootSiblingInstanceAlert.destroy();
  } else {
    rootSiblingInstanceAlert = ''
  }
}

const showAlert = (
  title, message, callbackOrButtons,
  styleConfig, wrapStyle
) => {
  hideAlert()
  if (!title|| !message) return
  let fixParams = Object.assign({
    title,
    message,
    callbackOrButtons,
    styleConfig
  },{closeAlert: hideAlert}, wrapStyle)
  const renderContent = (
    <Alert {...fixParams} />
  )
  rootSiblingInstanceAlert = new RootSiblings(renderContent)
  return rootSiblingInstanceAlert
}

export default {
  hideAlert,
  showAlert
}