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
import WidgetPage from './tankuang/widgetPage'

const tabNavigatorConf = {
  initialRouteName: 'Home',
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
  Home: {
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