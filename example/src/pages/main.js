/**
 * Author   : roy
 * Date     : 2017-07-13  17:23
 * Describe :
 */
import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import { px2dp } from '../utils/screenUtils'
import Icon from 'react-native-vector-icons/EvilIcons'

import ModalPage from './tankuang/modalPage'
import HUDPage from './tankuang/HUDPage'
import LoadingPage from './tankuang/LoadingPage'
import WidgetPage from './tankuang/widgetPage'

import {
  setLoadingDefaultOptions
} from 'react-native-global-ui'

setLoadingDefaultOptions({loadingText: 'default'})


const tabNavigatorConf = {
  initialRouteName: 'Loading',
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  lazy: true,
  lazyLoad: true,
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: '#FFC850',
    activeBackgroundColor: '#ffffff',
    inactiveTintColor: '#9f9f9f',
    inactiveBackgroundColor: '#ffffff',
    style: {
      backgroundColor: '#fff',
    }
  },
}

const MainTab = TabNavigator({
  Loading: {
    screen: LoadingPage,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'Loading HUD',
      title: 'Loading UI',
      tabBarIcon: ({tintColor}) => (
        <Icon name="refresh" size={25} color={tintColor} />
      ),
    })
  },
  HUD: {
    screen: HUDPage,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'HUD UI',
      title: 'HUD UI',
      tabBarIcon: ({tintColor}) => (
        <Icon name="refresh" size={25} color={tintColor} />
      ),
    })
  },
  modal: {
    screen: ModalPage,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '弹框UI',
      title: '弹框UI',
      tabBarIcon: ({tintColor}) => (
        <Icon name="refresh" size={25} color={tintColor} />
      ),
    })
  },
  page2: {
    screen: WidgetPage,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '组件UI',
      title: '组件UI',
      tabBarIcon: ({tintColor}) => (
        <Icon name="bell" size={25} color={tintColor} />
      ),
    })
  },
}, tabNavigatorConf)

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35
  }
})

export default MainTab