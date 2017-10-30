/**
 * Author   : roy
 * Date     : 2017-07-26  20:18
 * Describe :
 */

import {NavigationActions} from 'react-navigation'

const reset = (navigation, routeName, params) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName, params})]
  })
  navigation.dispatch(resetAction)
}

const replace = (navigation, routeName, params) => {
  const replaceAction = {
    type: 'ReplaceCurrentScreen',
    key: 'ReplaceCurrentScreen',
    routeName,
    params
  }
  navigation.dispatch(replaceAction)
}

// gets the current screen from navigation state
const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if(!route){
    console.warn(`route index: ${navigationState.index}`)
  }
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

export default {
  reset,
  replace,
  getCurrentRouteName
}
