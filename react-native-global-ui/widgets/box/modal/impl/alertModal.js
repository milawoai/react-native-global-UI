/**
 * Created by ygj on 2017/11/15.
 */
/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {
  View, StyleSheet, Image,
  TouchableOpacity, Text, Dimensions,
  Platform, ScrollView} from 'react-native'
import {px2dp, px2sp} from "../../../../utils/screenUtils"
import PropTypes from 'prop-types'
import {getColors} from '../../../../config/config'
const {width, height} = Dimensions.get('window')

class AlertModal extends Component {
  constructor (props) {
    super(props)
  }

  /* contents: [
  *   text:
  *   style:
  * ]
  * */
  static propTypes = {
    ...View.propTypes,
    contents: PropTypes.array,
    handleModalSureClick: PropTypes.func,
    onElementClose: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    contents: []
  };


  render() {
    const {contents, containerStyle, scrollStyle} = this.props
    let contentView = null;
    if (this.props.contentView) {
      contentView = this.props.contentView();
    } else {
      contentView = (
        <ScrollView style={scrollStyle}>
          {
            contents.map((elem, index) =>{
              return (
                <Text style={[elem.style]}>{elem.text}</Text>
              )
            })
          }
        </ScrollView>
      )
    }
    return(
      <View style = {[styles.container, containerStyle]} overflow = 'hidden'>
        {this.renderTitleView()}
        {contentView}
        {this.renderBottomView()}
      </View>
    );
  }

  renderTitleView = () => {
    let titleView = null;
    const {renderTitle, titleStyle, title} = this.props
    if (renderTitle) {
      titleView = renderTitle();
    } else {
      titleView = (
        <View style = {styles.titleView}>
          <Text style = {[styles.titleText, titleStyle]}>{title}</Text>
        </View>
      )
    }
    return titleView;
  }

  renderBottomView = () => {
    const {renderBottomView, onRequestClose} = this.props

    if (renderBottomView) {
      return renderBottomView()
    }
    let buttonText = null
    if (this.props.buttonText) {
      buttonText = this.props.buttonText
    } else {
      buttonText = '好的'
    }
    return(
      <View style = {styles.BottomView}>
        <TouchableOpacity activeOpacity = {0.5}
          onPress = {() => this.closeModal()}>
          <View style = {styles.BottomButtonView}>
            <Text style = {styles.BottomText}>{buttonText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
    alignItems: 'stretch',
    borderRadius: px2dp(10)
  },
  alertBackContainer:{
    backgroundColor:'white',
    justifyContent:'space-between'
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
  },
  titleView:{
    height:px2dp(88),
    // backgroundColor:'yellow',
    justifyContent:'center',
    borderBottomWidth:px2dp(2),
    borderBottomColor:'#8d8d8d'
    // alignItems:'center'
  },
  titleText:{
    fontSize:px2dp(40),
    color:'#3b3b3b',
    textAlign:'center'
  },
  BottomView:{
    height:px2dp(120),
    // backgroundColor:'yellow',
    justifyContent:'center',
    // borderTopWidth:1,
    // borderTopColor:'#8d8d8d'
  },
  BottomButtonView:{
    marginLeft:10,
    marginRight:10,
    height:px2dp(88),
    backgroundColor:'#ff8400',
    justifyContent:'center',
    borderRadius:px2dp(6),
  },
  BottomText:{
    color:'white',
    textAlign:'center',
    fontSize:px2dp(40),
  }
})

export default AlertModal
