/**
 * Created by ygj on 2017/11/8.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View, StyleSheet, Dimensions, PixelRatio ,StatusBar
} from 'react-native'
const ViewPropTypes = require('ViewPropTypes');

const window = Dimensions.get('window')
const deviceWidthDp = window.width

class CollectionView extends Component {

  /* staticConfig: {
        width: //view宽度,
     }
  */
  static PropsType = {
    ...View.propTypes,

    renderItem: PropTypes.func,
    lineNum: PropTypes.number,

    verticalGap: PropTypes.number,
    horizGap: PropTypes.number,

    dataSource: PropTypes.array,
    staticConfig: PropTypes.object,

    cellContainerStyle: View.propTypes.style
  }

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {dataSource, renderItem, lineNum, cellContainerStyle, staticConfig} = this.props

    let width = staticConfig  && staticConfig.width ? staticConfig.width : deviceWidthDp
    let numberLine = Number(lineNum) ? Number(lineNum) : 1
    let needWidth = width / numberLine

    let innerViewSource = dataSource ? dataSource.map((elem, index) => {
      return (
        <View style={[{ width: needWidth, height: needWidth},
          collectionStyles.cellContainerStyle,cellContainerStyle]} key={index}>
          {renderItem(elem, index)}
        </View>
      )
    }): null
    return (
      <View style={[collectionStyles.collectionContainer, this.props.style]}>
        {innerViewSource}
      </View>
    )
  }
}

export default CollectionView

const collectionStyles = StyleSheet.create({
  collectionContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'visible',
    flexWrap: 'wrap',
  },
  cellContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})