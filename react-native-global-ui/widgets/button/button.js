
'use strict';
import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

export default class Button extends Component {
  static defaultProps = {
    labelText:'确定'
  };

  static propTypes = {
    onPress: PropTypes.func,
    disable: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  renderInnerView(){
    if (this.state.isLoading) {
      return(
        <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'white'}
        />
      )
    } else {
      return this.props.children
    }
  }

  render(){
    if (this.props.disable) {
      return(
        <View style = {[styles.button,this.props.style,(this.props.disabledStyle)]}>
          {this.renderInnerView()}
        </View>
      )
    }
    return(
      <TouchableOpacity {...this.props}
        style = {[styles.button, this.props.style]}
        onPress={this.onPress}
      >
        {this.renderInnerView()}
      </TouchableOpacity>
    );
  }

  onPress = async (e) => {
    try {
      this.setState({
        isLoading: true
      })
      this.props && await this.props.onPress(e)
    } catch (error) {
      throw error
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }
}
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
});
