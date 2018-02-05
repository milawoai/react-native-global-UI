/**
 * Created by ygj on 2017/11/14.
 */


let Colors = {
  // MainColor
  mainColor: '#FFAB00',
  backColor: '#F4F4F4',

  //Text
  textTitleColor: '#333333',
  textHintColor: '#CCCCCC',
  textContentColor: '#666666',

  //
  divideLineColor: '#E5E5E5'
}

export const setColor = (customColors) => {
  Colors = Object.assign(Colors, customColors)
}

export const getColors = () => {
  return Colors
}