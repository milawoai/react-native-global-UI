/**
 * Created by ygj on 2017/11/7.
 */
import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import {
  View, StyleSheet,
  ScrollView,Text,
  Image, TouchableOpacity,
 } from 'react-native'
import {px2dp, px2sp} from "../../utils/screenUtils"

const ViewPropTypes = require('ViewPropTypes');

export default class ScrollViewWithBottomButton extends Component {

  static propTypes = {
    ...View.propTypes,
    //动画效果：None：没有，slide：底部滑出
    style: ViewPropTypes.style,
    //
    buttonContainerStyle: ViewPropTypes.style,
    //
    buttonHeight: PropTypes.number,
    //
    buttonStyle: ViewPropTypes.style,
    //
    buttonText: PropTypes.string,
    //
    buttonTextStyle: PropTypes.oneOf(
      PropTypes.string,
      PropTypes.number
    ),
    // button点击事件
    handleButtonClick: PropTypes.func,

    //
    renderBottomView: PropTypes.func
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render () {
    let {
      style, buttonStyle, buttonText, buttonTextStyle,
      handleButtonClick, renderBottomView,
      buttonHeight, buttonContainerStyle
    } = this.props

    let buttonArea = null
    if (renderBottomView) {
      buttonArea = renderBottomView()
    } else {
      buttonArea = (

        <View style={[ styles.buttonContainer, {height: buttonHeight} , buttonContainerStyle]}>
          <TouchableOpacity style = {[
            styles.cellButtonContainer,
            buttonStyle ]}
                            onPress={handleButtonClick}
                            activeOpacity={1}>
            <Text style = {[styles.buttonTextStyle, buttonTextStyle]}>{buttonText}</Text>
          </TouchableOpacity>
        </View>

      )
    }
    return (
      <View style={[styles.container, style]}>
        <ScrollView  {...this.props}>
          {this.props.children}
          <View style={{width: 1, height:buttonHeight + 10}}>
          </View>
        </ScrollView>
        {buttonArea}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  cellButtonContainer: {
    backgroundColor: 'white'
  },
  buttonTextStyle: {
    color: '#222222',
    fontSize: px2sp(30),
    textAlign: 'center'
  }
})

