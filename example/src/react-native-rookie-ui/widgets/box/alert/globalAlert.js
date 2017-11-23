/**
 * Created by ygj on 2017/8/9.
 */
import React, {Component} from 'react';
import RootSiblings from '../../rootsiblings/SiblingsManager'
import Alert from './impl/Alert'

let rootSiblingInstanceAlert = ''

let alertConfig = {}

const setAlertConfig = (config) => {
  alertConfig = Object.assign(alertConfig, config)
}

const getAlertConfig = () => {
  return alertConfig ? alertConfig : {}
}

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
  let fixParams = Object.assign(
    {
      title,
      message,
      callbackOrButtons,
      styleConfig: styleConfig ? styleConfig :alertConfig.styleConfig
    },{closeAlert: hideAlert},
    wrapStyle ? wrapStyle : alertConfig.wrapStyle)
  const renderContent = (
    <Alert {...fixParams} />
  )
  rootSiblingInstanceAlert = new RootSiblings(renderContent)
  return rootSiblingInstanceAlert
}

export default {
  hideAlert,
  showAlert,
  setAlertConfig,
  getAlertConfig
}