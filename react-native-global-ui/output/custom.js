/**
 * Created by ygj on 2017/8/9.
 */
'use strict'
import React, {Component} from 'react';

import GlobalCustom from '../widgets/rootsiblings/globalUserCustom'

export const GlobalShower = {
  show: (elem, options) => {
    GlobalCustom.hideUserCustom()
    GlobalCustom.showUserCustom(elem, options)
  },
  hide: GlobalCustom.hideCustom
}
