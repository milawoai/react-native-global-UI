/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import GlobalAlert from '../widgets/box/alert/globalAlert'

import * as Config from '../config/config'
import * as CommonStyle from '../res/commonStyle'

export const alert = {
  alert: (
    title,
    message,
    callbackOrButtons,
    styleConfig,
    wrapStyle
  ) => {
    let alertConfig = GlobalAlert.getAlertConfig()
    GlobalAlert.hideAlert()
    GlobalAlert.showAlert(
      title,
      message,
      callbackOrButtons,
      Object.assign({}, styleConfig, alertConfig.styleConfig),
      Object.assign({}, wrapStyle, alertConfig.wrapStyle)
    )
  },
  alertCancelConfirm: (
    title,
    message,
    {
      cancelConfig,
      confirmConfig,
      reserve
    },
    wrapStyleConfig
  ) => {
    let alertConfig = GlobalAlert.getAlertConfig()
    cancelConfig = Object.assign({}, alertConfig? alertConfig.cancelConfig :{} , cancelConfig)
    confirmConfig = Object.assign({}, alertConfig? alertConfig.confirmConfig :{} , confirmConfig)

    if (!cancelConfig) {
      cancelConfig = {
        text: '取消'
      }
    }
    if (!confirmConfig) {
      cancelConfig = {
        text: '确认'
      }
    }

    GlobalAlert.hideAlert()
    let callbackOrButtons = [
      cancelConfig,
      {
        text: '确认退款',
        onPress: () => {
          handleConfirm()
        },
        textStyle: confirmTextStyle,
        containerStyle: confirmTextStyle
      }
    ]
    GlobalAlert.showAlert(
      title,
      message,
      callbackOrButtons,
      alertConfig.styleConfig,
      wrapStyleConfig ? wrapStyleConfig: alertConfig.wrapStyleConfig
    )
  },
  setDefaultConfig : (configKey, configValue) => {
    let newConfig = {}
    newConfig[configKey] = configValue
    GlobalAlert.setAlertConfig(newConfig)
  },
  hide: GlobalAlert.hideAlert
}
