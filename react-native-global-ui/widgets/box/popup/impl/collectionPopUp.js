/**
 * Created by ygj on 2017/9/13.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import CollectionView from '../../../../wrap/collectionView'
import {px2dp, px2sp} from "../../../../utils/screenUtils"
import PropTypes from 'prop-types'


class CollectionPopUp extends Component {

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

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <CollectionView {...this.props} >
      </CollectionView>
    )
  }
}
export default CollectionPopUp
