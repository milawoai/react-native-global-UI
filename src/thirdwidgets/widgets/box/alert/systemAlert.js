/**
 * Created by ygj on 2017/11/1.
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AlertIOS
 * @flow
 * @jsdoc
 */
'use strict';
import {
  Platform,
  Alert
} from 'react-native'

const OptionAlert = require('NativeModules').OptionAlert;


export type ButtonsArray = Array<{
  /**
   * Button label
   */
    text?: string,
  /**
   * Callback function when button pressed
   */
    onPress?: ?Function,
}>;

class SystemAlert {
  /**
   * Create and display a popup alert.
   * @static
   * @method alert
   * @param title The dialog's title.
   * @param message An optional message that appears below
   *     the dialog's title.
   * @param callbackOrButtons This optional argument should
   *    be either a single-argument function or an array of buttons. If passed
   *    a function, it will be called when the user taps 'OK'.
   *
   *    If passed an array of button configurations, each button should include
   *    a `text` key, as well as optional `onPress` and `style` keys. `style`
   *    should be one of 'default', 'cancel' or 'destructive'.
   * @param type Deprecated, do not use.
   *
   * @example <caption>Example with custom buttons</caption>
   *
   * AlertIOS.alert(
   *  'Update available',
   *  'Keep your app up to date to enjoy the latest features',
   *  [
   *    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
   *    {text: 'Install', onPress: () => console.log('Install Pressed')},
   *  ],
   * );
   */
  static alert(
    title,
    message,
    callbackOrButtons,
    type,
  ): void {
      if (Platform.OS === 'ios') {
        this.prompt(title, message, callbackOrButtons, 'default');
      } else {
        Alert.alert(title, message, callbackOrButtons, type)
      }
  }

  static prompt(
    title: ?string,
    message?: ?string,
    callbackOrButtons?: ?((text: string) => void) | ButtonsArray,
    type?: ?AlertType = 'plain-text',
    defaultValue?: string,
    keyboardType?: string
  ): void {
    if (typeof type === 'function') {
      console.warn(
        'You passed a callback function as the "type" argument to AlertIOS.prompt(). React Native is ' +
        'assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) ' +
        'signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue, ' +
        'keyboardType) and the old syntax will be removed in a future version.');

      var callback = type;
      var defaultValue = message;
      OptionAlert.alertWithArgs({
        title: title || undefined,
        type: 'plain-text',
        defaultValue,
      }, (id, value) => {
        callback(value);
      });
      return;
    }

    var callbacks = [];
    var buttons = [];
    var cancelButtonKey;
    var destructiveButtonKey;
    if (typeof callbackOrButtons === 'function') {
      callbacks = [callbackOrButtons];
    }
    else if (callbackOrButtons instanceof Array) {
      callbackOrButtons.forEach((btn, index) => {
        callbacks[index] = btn.onPress;
        if (btn.style === 'cancel') {
          cancelButtonKey = String(index);
        } else if (btn.style === 'destructive') {
          destructiveButtonKey = String(index);
        }
        if (btn.text || index < (callbackOrButtons || []).length - 1) {
          var btnDef = {};
          btnDef[index] = btn.text || '';
          buttons.push(btnDef);
        }
      });
    }

    OptionAlert.alertWithArgs({
      title: title || undefined,
      message: message || undefined,
      buttons,
      type: type || undefined,
      defaultValue,
      cancelButtonKey,
      destructiveButtonKey,
      keyboardType,
    }, (id, value) => {
      var cb = callbacks[id];
      cb && cb(value);
    });
  }
}

module.exports = SystemAlert;
