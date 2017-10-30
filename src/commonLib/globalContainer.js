/**
 * Created by ygj on 2017/10/30.
 */
import {
  StyleSheet,
  View,
  AppRegistry
} from 'react-native';
import React, {
  Component
} from 'react';
import StaticContainer from 'static-container';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
});

let isEstablished = false;

(function initAppRegistryInjection() {
  if (isEstablished) return
  isEstablished = true
  const originRegister = AppRegistry.registerComponent;
  AppRegistry.registerComponent = function(appKey, getAppComponent) {
    const siblings = new Map();
    const updates = new Set();

    return originRegister(appKey, function() {
      const OriginAppComponent = getAppComponent();

      return class extends Component {
        static displayName = `Root(${appKey})`;

        componentWillMount() {
          this._update = this._update.bind(this);
          RCTDeviceEventEmitter.addListener('siblings.update', this._update);
        };

        componentWillUnmount() {
          RCTDeviceEventEmitter.removeListener('siblings.update', this._update);
          siblings.clear();
          updates.clear();
        };

        _update(id, element, callback) {
          if (siblings.has(id) && !element) {
            siblings.delete(id);
          } else {
            siblings.set(id, element);
          }
          updates.add(id);
          this.forceUpdate(callback);
        };

        render() {
          const elements = [];
          siblings.forEach((element, id) => {
            elements.push(
              <StaticContainer
                key={`root-sibling-${id}`}
                shouldUpdate={updates.has(id)}
              >
                {element}
              </StaticContainer>
            );
          });
          updates.clear();

          return (
            <View style={styles.container}>
              <StaticContainer shouldUpdate={false}>
                <OriginAppComponent {...this.props} />
              </StaticContainer>
              {elements}
            </View>
          );
        };
      };
    });
  }
})()