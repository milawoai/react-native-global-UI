/**
 * Created by ygj on 2017/10/30.
 */
/**
 * Author   : roy
 * Date     : 2017-07-13  17:23
 * Describe :
 */
import React from 'react'

import {
  StackNavigator
} from 'react-navigation'
import {
  StatusBar,
  Platform
} from 'react-native'

import {
  px2dp,
  px2sp
} from '../utils/screenUtils'

import Main from './main'

import navigationUtils from '../utils/navigationUtils'

const navigationOptions = ({
  navigation
}) => {
  return {
    headerBackTitleStyle: {
      backgroundColor: '#fff',
    },
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: px2dp(2),
          },
          shadowOpacity: 0.1,
          shadowRadius: px2dp(4),
        },
      })
    },
    headerBackTitle: null,
    headerTintColor: '#AFAFAF',
    headerTitleStyle: {
      alignSelf: 'center',
      color: '#111',
      fontSize: px2sp(36),
    },
  }
}

const stackNavigationConfigs = {
  navigationOptions,
  initialRouteName: 'Main',
  headerMode: 'screen',
  mode: 'card',
}

const AppRoutes = {
  Main: {
    screen: Main,
  }
}

const StackNav = StackNavigator(AppRoutes, stackNavigationConfigs)

const defaultGetStateForAction = StackNav.router.getStateForAction

/**
 * 去除Route中一组特定页面
 */
const getStateWithFilterSomePage = (state, filterPageArray = []) => {
  const routes = []
  for (let route of state.routes) {
    if (filterPageArray.indexOf(route.routeName) < 0) {
      routes.push(route)
    }
  }
  return {
    ...state,
    routes,
    index: routes.length - 1
  }
}

/**
 */
StackNav.router.getStateForAction = withUpdateStatusBar((action, state) => {
  if (state && action.type === 'loginSuccess') {
    const loginPages = ['VerifyPhone', 'Login', 'VerifyIdentifyingCode']
    return getStateWithFilterSomePage(state, loginPages)
  }

  if (state && action.type === 'doAuthPerson') {
    return getStateWithFilterSomePage(state, ['Guess', 'AuthPerson'])
  }

  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1)
    routes.push(action)
    return {
      ...state,
      routes,
      index: routes.length - 1,
    }
  }

  return defaultGetStateForAction(action, state)
})

function withUpdateStatusBar(func) {
  return (...args) => {
    const newState = func(...args)
    const currentRouteName = navigationUtils.getCurrentRouteName(newState)
    switch (currentRouteName) {
      case 'Splash':
        StatusBar.setHidden(true, true)
      default:
        StatusBar.setHidden(false, true)
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('black')
          StatusBar.setTranslucent(false)
        }
        break
    }
    return newState
  }
}

export default StackNav