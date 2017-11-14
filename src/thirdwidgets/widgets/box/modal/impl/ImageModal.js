/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {px2dp} from "../../../../utils/screenUtils"
import {bk_ad_modal, ic_model_close} from '../../../../res/links'
import PropTypes from 'prop-types'

class ImageModal extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    ...View.propTypes,
    //动画效果：None：没有，slide：底部滑出 (未完成) fade：淡入淡出
    adImageUrl: PropTypes.string,
    //点击事件
    handleModalSureClick: PropTypes.func,
    //关闭监听
    onElementClose: PropTypes.func,
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.clickImage}
                          style={[styles.adImageContainer]}
                          activeOpacity={0.9}>
          <Image source={
            this.props && this.props.adImageUrl?
              {
                uri: this.props.adImageUrl,
              }:bk_ad_modal}
                 style={[styles.adImage]}
                 resizeMode={'contain'}
                 defaultSource={bk_ad_modal}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.closeModal}
                          style={[styles.closeContainer]}
                          activeOpacity={0.9}>
          <Image source={
            ic_model_close
          } style={[styles.closeImage]}/>
        </TouchableOpacity>
      </View>
    )
  }

  clickImage = () => {
    this.props.handleModalSureClick && this.props.handleModalSureClick()
    this.props.startCloseAction && this.props.startCloseAction()
  }

  closeModal = () => {
    this.props.onElementClose && this.props.onElementClose()
    this.props.startCloseAction && this.props.startCloseAction()
  }
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: 25,
    alignItems: 'center'
  },
  closeImage: {
    height: 40,
    width: 40
  }
})

export default ImageModal
