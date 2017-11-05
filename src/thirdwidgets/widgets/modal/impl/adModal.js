/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Xmodal from '../wrapmodal/wrapModal'
import {px2dp} from "../../../utils/screenUtils"
import links from '../../../res/links'

class AdModal extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.clickAdBtn}
                          style={[styles.adImageContainer]}
                          activeOpacity={0.9}>
          <Image source={
            this.props && this.props.adImageUrl?
              {
                uri:this.props.adImageUrl,
                cache: 'force-cache'
              }:links.specialins}
                 style={[styles.adImage]}
                 resizeMode={'contain'}
                 defaultSource={links.specialins}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.closeModal}
                          style={[styles.closeContainer]}
                          activeOpacity={0.9}>
          <Image source={
            links.adCloseIcon
          } style={[styles.closeImage]}/>
        </TouchableOpacity>
      </View>
    )
  }

  clickAdBtn = () => {
    this.props.handleBtnClick && this.props.handleBtnClick()
    this.props.startCloseAction && this.props.startCloseAction()
  }

  closeModal = () => {
    this.props.startCloseAction && this.props.startCloseAction()
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  adImageContainer: {
    alignItems: 'center'
  },
  adImage: {
    height: px2dp(718),
    width: px2dp(550)
  },
  closeContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  },
  closeImage: {
    height: px2dp(82),
    width: px2dp(82),
    marginBottom: px2dp(54)
  }
})

export default AdModal
