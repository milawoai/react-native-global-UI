/**
 * Created by ygj on 2017/9/7.
 */
import * as R from 'ramda'


const isNotNil = R.compose(R.not, R.isNil);

// Extract the specified props from the given component instance.
// - {`object`} `view` the component instance
// - {`array`|`object`} `propTypes` props definitions
function extractProps(view, propTypes) {
  const propNames = Array.isArray(propTypes) ? propTypes : R.keys(propTypes);
  const filter = (v, k) => R.indexOf(k, propNames) >= 0 && isNotNil(v);
  return R.pickBy(filter, view.props);
}

export default {
  extractProps
}