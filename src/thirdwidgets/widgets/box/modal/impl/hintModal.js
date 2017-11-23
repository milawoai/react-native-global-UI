/**
 * Created by ygj on 2017/11/15.
 */
/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {px2dp, px2sp} from "../../../../utils/screenUtils"
import {ic_hint_example, ic_model_close} from '../../../../res/links'
import PropTypes from 'prop-types'
import ImageWithText from '../../../../trivial/imageWithText'
import {getColors} from '../../../../config/config'

class HintModal extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    ...View.propTypes,

    title: PropTypes.string,

    handleModalSureClick: PropTypes.func,
    //关闭监听
    onElementClose: PropTypes.func,
  }

  static defaultProps = {
    title: '余额不足',
    image: ic_hint_example,
    context: '2个*******余额过低，请尽快充值，以免失去******。'
  };


  render () {
    const {
      containerStyle,
      title , titleStyle, imageStyle,
      context, contextStyle
    } = this.props

    const commonColors = getColors()

    return (
      <View style={[styles.container, containerStyle]}>
        <ImageWithText
          textStyle = {[styles.titleStyle, {color: commonColors.textTitleColor}, titleStyle]}
          imageStyle = {[styles.imageStyle, imageStyle]}
          text = {title} image = {this.props.image}
        />
        <Text style={[styles.contextStyle, {color: commonColors.textHintColor}, contextStyle]}>{context}</Text>
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
    backgroundColor: 'white',
    width: px2dp(614),
    alignItems: 'center'
  },
  titleStyle: {
    marginTop: px2dp(27),
    fontWeight: '500',
    fontSize: px2sp(36),
    lineHeight: px2sp(50),
  },
  imageStyle: {
    marginTop: px2dp(64),
    height: px2dp(260),
    width: px2dp(205)
  },
  contextStyle: {
    marginTop: px2dp(30),
    marginHorizontal: px2dp(60),
    fontSize: px2sp(32),
    lineHeight: px2sp(45),
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

export default HintModal
