/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import GlobalCustom from '../widgets/rootsiblings/globalCustom'

export const GlobalShower = {
  show: (elem, options) => {
    GlobalCustom.hideCustom()
    GlobalCustom.showCustom(elem, options)
  },
  hide: GlobalCustom.hideCustom
}
