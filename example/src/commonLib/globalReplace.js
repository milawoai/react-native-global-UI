/**
 * Created by ygj on 2017/10/30.
 */

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  }
}