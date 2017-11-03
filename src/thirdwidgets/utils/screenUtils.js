/**
 * Author   : roy
 * Date     : 2017-07-13  18:25
 * Describe :
 */
import { Dimensions, PixelRatio ,StatusBar} from 'react-native'

//只有竖屏模式，所以可以只获取一次 width
const window = Dimensions.get('window')
const deviceWidthDp = window.width
const pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度

const fontSizeScale = PixelRatio.getFontScale()

// UI 默认给图是 750
export const SCREEN_WIDTH = 750
export const SCREEN_HEIGHT = 1334

const widthScale = window.width / SCREEN_WIDTH
const heightScale = (window.height - StatusBar.currentHeight) / SCREEN_HEIGHT

export const createPx2dp = (args = {}) => {
  let {
    flexScaleEnable = false, // 是否开启自适应缩放比例 INSIDE
    scale = widthScale
  } = args

  if (flexScaleEnable) {
    scale = widthScale > heightScale ? heightScale : widthScale
  }
  return uiElementPx => uiElementPx * scale
}

//间距
export const px2dp = createPx2dp()

/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function px2sp(size) {
  let uiElementPx = Math.round((size *  deviceWidthDp / SCREEN_WIDTH + 0.5) * (pixelRatio > 2?2:pixelRatio) / fontSizeScale);
  return uiElementPx / defaultPixel;
}