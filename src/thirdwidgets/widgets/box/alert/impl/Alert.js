/**
 * Created by ygj on 2017/11/14.
 */
/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {px2dp, px2sp} from "../../../../utils/screenUtils"
import {bk_ad_modal, ic_model_close} from '../../../../res/links'
import {MaskWarp} from '../../MaskNest'
import PropTypes from 'prop-types'
import {getColors} from '../../../../config/config'

class Alert extends Component {

  constructor (props) {
    super(props)
  }

  /*
  *
  * title,
   * message,
   * callbackOrButtons
  * */

  static propTypes = {
    ...View.propTypes,
    //动画效果：None：没有，slide：底部滑出 (未完成) fade：淡入淡出
    title: PropTypes.string,
    //点击事件
    message: PropTypes.string,
    //按钮事件
    callbackOrButtons: PropTypes.array,
    // style config
    styleConfig: PropTypes.object,

    closeAlert: PropTypes.func
  }

  static defaultProps = {
    styleConfig: {}
  }

  render () {
    const {title, message, callbackOrButtons, styleConfig, closeAlert} = this.props
    let customCallbackOrButtons = callbackOrButtons?
      callbackOrButtons.map((elem, index) => {
        if (!elem.onPress) {
          elem.onPress = closeAlert
        }
        return elem
      }) : [
        {
          text: '取消',
          onPress: closeAlert
        }
      ]

    const {container,
      titleContainer, titleText,
      messageContainer, messageText,
      buttonAreaContainer, buttonContainer,  buttonText
    } = styleConfig

    const commonColors = getColors()

    return (
      <View style={[styles.container, container]}>
        {
          title ?
            <View style={[styles.titleContainer, titleContainer]}>
              <Text style={[styles.titleText, {color: commonColors.textTitleColor}, titleText]}t>
                {title}
              </Text>
            </View>
            : null
        }
        {
          message ?
            <View style={[styles.messageContainer, messageContainer]}>
              <Text style={[styles.messageText, {color: commonColors.textHintColor}, messageText]}t>
                {title}
              </Text>
            </View>
            : null
        }
        <View style={[styles.buttonAreaContainer,{ borderTopColor: commonColors.divideLineColor},buttonAreaContainer]}>
          {
            customCallbackOrButtons.map((elem, index) => {
              const divideLine = index < customCallbackOrButtons.length - 1 ? {
                borderRightColor: commonColors.divideLineColor,
                borderRightWidth: 1
              } : null
              return (
                <TouchableOpacity
                  key={`${index}_rookie_alert_button`}
                  onPress = {elem.onPress}
                  style={[styles.buttonContainer,divideLine, buttonContainer,  elem.containerStyle]}
                  activeOpacity={0.9}>
                  <Text style={[styles.buttonText, buttonText, elem.textStyle]}>
                    {elem.text}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: px2dp(614),
    backgroundColor: 'white',
    borderRadius: px2dp(20),
    alignItems: 'stretch',
    paddingTop: px2dp(20),
    overflow: 'hidden'
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: px2dp(20),
    paddingHorizontal: px2dp(30)
  },
  titleText: {
    fontSize: px2sp(36),
    lineHeight: px2sp(50),
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: px2dp(20),
    paddingHorizontal: px2dp(30),
  },
  messageText: {
    fontSize: px2sp(32),
    lineHeight: px2sp(45),
  },
  buttonAreaContainer: {
    height: px2dp(100),
    marginTop: px2dp(40),
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: px2sp(32),
    lineHeight: px2sp(45),
  }
})

export default MaskWarp(Alert)
