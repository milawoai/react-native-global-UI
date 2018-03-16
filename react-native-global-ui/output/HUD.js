/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import HUDComponent from '../widgets/box/hud/hud'
import GlobalCustom from '../widgets/rootsiblings/globalCustom'

const show = (custom, params) => {
  GlobalCustom.hideCustom()
  GlobalCustom.showCustom(custom, params)
}

export const HUD = {
  show: (options) => {
    GlobalCustom.hideCustom()
    show(HUDComponent, options)
  },
  showSuccess: (options) => {
    GlobalCustom.hideCustom()
    let showOption = Object.assign({}, options, {hintType: 'success'} )
    show(HUDComponent, showOption)
  },
  showFail: (options) => {
    GlobalCustom.hideCustom()
    let showOption = Object.assign({}, options, {hintType: 'fail'})
    show(HUDComponent, showOption)
  },
  hide: GlobalCustom.hideCustom
}