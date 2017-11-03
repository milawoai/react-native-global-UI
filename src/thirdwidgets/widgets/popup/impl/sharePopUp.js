// /**
//  * Created by ygj on 2017/9/13.
//  */
// import React, { Component } from 'react'
// import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
// import WarpPopUp from '../wrappopup/warpPopUp'
// import {px2dp, px2sp} from "../../../utils/screenUtils"
// import {shareWithType, ShareActionType} from "../../../utils/shareUtils";
// import links from '../../../images/links'
//
// const shareInfos = [
//   {
//     shareType: ShareActionType.WX,
//     shareTitle: '微信好友',
//     shareImage: links.wxShareIcon
//   },
//   {
//     shareType:  ShareActionType.WXFriendCircle,
//     shareTitle: '微信朋友圈',
//     shareImage: links.wxShareCircleIcon
//   }
// ]
//
// class SharePopUp extends Component {
//
//   constructor (props) {
//     super(props)
//   }
//
//   render () {
//     return (
//       <View style={this.props.style}>
//         {this.renderShareBtnArray()}
//         <TouchableOpacity onPress = {this.props.closePopUp} style={[styles.closeContainer]} activeOpacity={1}>
//           <Text style={[styles.closeTitle]} >取消</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
//
//   renderShareBtnArray() {
//     let self = this
//     let shareItemsReactElements = shareInfos.map((element, index) => {
//       if(!element.isHidden){
//         return (
//           <TouchableOpacity
//             key={'shareItemsReactElements'+index}
//             onPress={()=> {
//               self.handleShareClick(element.shareType)
//             }}
//             style={[styles.shareItemContainer]}>
//             <Image source={element.shareImage} style={[styles.shareImage]}/>
//             <Text style={styles.shareTitle}>{element.shareTitle}</Text>
//           </TouchableOpacity>
//         );
//       }
//     })
//     return (
//       <View style={[styles.shareArrayContainer]}>
//         {shareItemsReactElements}
//       </View>
//     )
//   }
//
//   handleShareClick = async (shareType) => {
//     let result = await shareWithType(shareType, this.props.shareData, this.props.extShareInfo)
//     if (result) {
//       this.props.closePopUp && this.props.closePopUp()
//     }
//   }
//
// }
//
// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     alignItems: 'center'
//   },
//   shareArrayContainer: {
//     height: px2dp(320),
//     flexDirection: 'row',
//     alignSelf: 'stretch',
//     alignItems: 'center'
//   },
//   shareItemContainer:{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   shareImage: {
//     height: px2dp(90),
//     width: px2dp(90)
//   },
//   shareTitle: {
//     marginTop: px2dp(25),
//     color: '#777777',
//     fontSize: px2sp(23),
//     lineHeight: px2sp(32)
//   },
//   closeContainer: {
//     flex: 1,
//     alignSelf: 'stretch',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7F7F7',
//   },
//   closeTitle: {
//     color: '#999999',
//     fontSize: px2sp(30),
//     lineHeight: px2sp(42)
//   }
// })
//
// export default SharePopUp
