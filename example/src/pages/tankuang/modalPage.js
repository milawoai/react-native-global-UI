/**
 * Created by ygj on 2017/10/30.
 */
import React, { Component } from 'react'
import {
  StyleSheet, Image, View, TouchableOpacity, Text, ScrollView, Animated, Easing
} from 'react-native'
import { px2dp , px2sp} from '../../utils/screenUtils'
import {
  commonStyle,
  GlobalShower
} from 'react-native-global-ui'



class Windows extends React.Component {
  render() {
    return (
      <View style={{width: 40, height: 40, borderRadius: 100, backgroundColor: 'red', position: 'absolute', right: 20, top: 390}}/>
    );
  }
}

class CellItem extends Component {
  render() {
    const {title, buttonInfos} = this.props

    let buttonArea = buttonInfos.map((elem, index) => {
      return (
        <TouchableOpacity onPress={
          () => {
            elem.onPress(elem.params)
          }
        } style={CellItemStyle.buttonContainer} key={`buttonInfos${index}`}>
          <Text style={CellItemStyle.buttonText}>{elem.text}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <View style = {CellItemStyle.cellContainer}>
        <View style = {CellItemStyle.cellTitleContainer}>
          <Text style={CellItemStyle.cellTitle}>{title}</Text>
        </View>
        <View style={[CellItemStyle.buttonAreaContainer, commonStyle.lineWarpStyle]}>
          {buttonArea}
        </View>
      </View>
    )
  }
}

export default class ModalPage extends Component {
  constructor(props) {
    super(props);

    const WidgetInfo = {
      title: 'Widget',
      buttonInfos: [
        {
          text: 'Widget',
          onPress: () => {
            GlobalShower.show(Windows)
          }
        }
      ]
    }

    this.modalApis = [
      WidgetInfo
    ]
  }

  render() {
    let cells =  this.modalApis.map((elem, index) => {
      return (
        <CellItem title = {elem.title}
                  buttonInfos = {elem.buttonInfos}
                  key={`modalApis_${index}`} />
      )
    })
    return (
      <ScrollView>
        {cells}
      </ScrollView>
    )
  }
}

const CellItemStyle = {
  cellContainer: {
   paddingBottom: px2dp(20)
  },
  cellTitleContainer: {
    backgroundColor: '#C0C0C0',
    height: px2dp(100),
    justifyContent: 'center',
    paddingLeft: px2dp(20),
    alignSelf: 'stretch'
  },
  cellTitle: {
   fontSize: px2sp(30)
  },
  buttonAreaContainer: {
    flexDirection: 'row',
    margin: px2dp(20),
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: px2dp(10),
    margin: px2dp(10),
    padding: px2dp(20)
  },
  buttonText: {
    fontSize: px2sp(30)
  }
}