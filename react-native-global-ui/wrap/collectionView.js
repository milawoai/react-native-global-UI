/**
 * Created by ygj on 2017/11/8.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View, StyleSheet
} from 'react-native'
const ViewPropTypes = require('ViewPropTypes');

class CollectionView extends Component {
  static PropsType = {

    ...View.propTypes,

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
    renderBottomView: PropTypes.func,

    renderItem: PropTypes.func,
    verticalGap: PropTypes.number,
    horizGap: PropTypes.number,
    dataSource: PropTypes.array
  }

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      helperCount: 10000
    }
  }

  render() {
    <View style={[ this.props.style, collectionStyles.collectionContainer]}>
    </View>
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
  }
})