/**
 * Created by ygj on 2017/10/17.
 */

'use strict'
import React, { PropTypes, Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
} from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = {
  container: {
    backgroundColor: 'transparent',
  },

  wrapperIOS: {
    backgroundColor: 'transparent',
  },

  wrapperAndroid: {
    backgroundColor: 'transparent',
    flex: 1
  },

  slide: {
    backgroundColor: 'transparent',
  },

  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },

  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent'
  },

  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 50,
    color: '#007aff',
    fontFamily: 'Arial'
  }
}

// missing `module.exports = exports['default'];` with babel6
// export default React.createClass({
export default class extends Component {
  /**
   * Props Validation
   * @type {Object}
   */
  static propTypes = {
    horizontal: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),

    swiperDatas: PropTypes.array,
    renderItem: PropTypes.func,

    pagingEnabled: PropTypes.bool,
    showsHorizontalScrollIndicator: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    bounces: PropTypes.bool,
    scrollsToTop: PropTypes.bool,
    removeClippedSubviews: PropTypes.bool,
    automaticallyAdjustContentInsets: PropTypes.bool,
    showsPagination: PropTypes.bool,
    showsButtons: PropTypes.bool,
    loadMinimal: PropTypes.bool,
    loadMinimalSize: PropTypes.number,
    loadMinimalLoader: PropTypes.element,
    loop: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    autoplayDirection: PropTypes.bool,
    index: PropTypes.number,
    renderPagination: PropTypes.func,
    dotStyle: PropTypes.object,
    activeDotStyle: PropTypes.object,
    dotColor: PropTypes.string,
    activeDotColor: PropTypes.string,
    /**
     * Called when the index has changed because the user swiped.
     */
    onIndexChanged: PropTypes.func
  }


  static defaultProps = {
    horizontal: true,
    pagingEnabled: false,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    showsButtons: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: () => null
  }

  state = this.initState(this.props)

  /**
   * autoplay timer
   * @type {null}
   */
  autoplayTimer = null
  loopJumpTimer = null

  constructor(props) {
    super(props);
    this.isSetOffset = true
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer)
    this.isSetOffset = true
    this.setState(this.initState(nextProps, this.props.index !== nextProps.index), () => {
      this.isSetOffset = false
    })
  }

  componentDidMount () {
    this.autoplay()
  }

  componentWillUnmount () {
    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.index !== nextState.index) this.props.onIndexChanged(nextState.index)
  }

  initOffset(props) {
    const {
      swiperDatas,
      grap,
      itemWidth
    } = props;
    return  {x: grap + itemWidth  , y: 0}
  }

  initState (props, updateIndex = false) {
    const state = this.state || { width: 0, height: 0, offset: { x: 0, y: 0 } }

    const initState = {
      autoplayEnd: false,
      loopJump: false
    }

    initState.total = props.swiperDatas ? props.swiperDatas.length || 1 : 0
    initState.index = 0

    // Default: horizontal
    initState.dir = props.horizontal === false ? 'y' : 'x'
    initState.width = props.width || width
    initState.height = props.height || height
    initState.offset = this.initOffset(props)

    this.internals = {
      ...this.internals,
      offset: initState.offset,
      isScrolling: false
    };
    return initState
  }

  onLayout = (event) => {
  }


  /**
   * Automatic rolling
   */
  autoplay = () => {
    // if (!Array.isArray(this.props.children) ||
    //   !this.props.autoplay ||
    //   this.internals.isScrolling ||
    //   this.state.autoplayEnd) return
    //
    // this.autoplayTimer && clearTimeout(this.autoplayTimer)
    // this.autoplayTimer = setTimeout(() => {
    //   if (!this.props.loop && (
    //       this.props.autoplayDirection
    //         ? this.state.index === this.state.total - 1
    //         : this.state.index === 0
    //     )
    //   ) return this.setState({ autoplayEnd: true })
    //
    //   this.scrollBy(this.props.autoplayDirection ? 1 : -1)
    // }, this.props.autoplayTimeout * 1000)
  }

  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin = e => {
    this.internals.isScrolling = true
  }

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd = e => {
    // update scroll state
    this.internals.isScrolling = false

    // making our events coming from android compatible to updateIndex logic
    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {x: e.nativeEvent.position * this.state.width}
      } else {
        e.nativeEvent.contentOffset = {y: e.nativeEvent.position * this.state.height}
      }
    }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
    })
  }


  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex = (offset, dir, cb) => {
    const state = this.state
    const {
      swiperDatas,
      grap,
      itemWidth
    } = this.props
    let dataLen = swiperDatas.length
    let index = state.index
    const diff = offset[dir] - this.internals.offset[dir]
    const step = itemWidth + grap
    let loopJump = false

    index = parseInt(index + Math.round(diff / step))

    // Do nothing if offset no change.
    if (!diff) return

    if (offset.x < step) {
      index = dataLen - 1
      offset[dir] = step * dataLen
      loopJump = true
    }
    if (offset.x >  dataLen * step) {
      index = 0
      offset[dir] = step
      loopJump = true
    }

    const newState = {}
    newState.index = index
    newState.loopJump = loopJump
    this.internals.offset = offset

    if (loopJump) {
      if (offset[dir] === this.internals.offset[dir]) {
        newState.offset = { x: 0, y: 0 }
        newState.offset[dir] = offset[dir] + 1
        this.setState(newState, () => {
          this.setState({ offset: offset }, cb)
        })
      } else {
        newState.offset = offset
        this.setState(newState, cb)
      }
    } else {
      this.setState(newState, cb)
    }
  }

  scrollBy = (index, animated = true) => {
    // if (this.internals.isScrolling || this.state.total < 2) return
    // const state = this.state
    // const diff = (this.props.loop ? 1 : 0) + index + this.state.index
    // let x = 0
    // let y = 0
    // if (state.dir === 'x') x = diff * state.width
    // if (state.dir === 'y') y = diff * state.height
    //
    // if (Platform.OS === 'android') {
    //   this.refs.scrollView && this.refs.scrollView[animated ? 'setPage' : 'setPageWithoutAnimation'](diff)
    // } else {
    //   this.refs.scrollView && this.refs.scrollView.scrollTo({ x, y, animated })
    // }
    //
    // // update scroll state
    // this.internals.isScrolling = true
    // this.setState({
    //   autoplayEnd: false
    // })
    //
    // // trigger onScrollEnd manually in android
    // if (!animated || Platform.OS === 'android') {
    //   setImmediate(() => {
    //     this.onScrollEnd({
    //       nativeEvent: {
    //         position: diff
    //       }
    //     })
    //   })
    // }
  }

  render () {
    const {
      loop
    } = this.props;
    const loopVal = loop ? 1 : 0

    let pages = this.renderScrollContent()

    return (
      <View style={[styles.container]} onLayout={this.onLayout}>
        {this.renderScrollView(pages)}
        {this.renderPagination()}
      </View>
    )
  }

  renderPagination = () => {

    let dots = []
    const ActiveDot = this.props.activeDot || <View style={[{
        backgroundColor: this.props.activeDotColor || '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }, this.props.activeDotStyle]} />
    const Dot = this.props.dot || <View style={[{
        backgroundColor: this.props.dotColor || 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
      }, this.props.dotStyle ]} />
    for (let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ? React.cloneElement(ActiveDot, {key: i})
        : React.cloneElement(Dot, {key: i})
      )
    }

    return (
      <View pointerEvents='none' style={[styles['pagination_' + this.state.dir], {marginTop: 50}]}>
        {dots}
      </View>
    )
  }

  renderScrollContent = () => {
    const {
      index,
      width,
      height
    } = this.state;
    const {
      loop,
      swiperDatas,
      renderItem,
      grap,
      itemHeight,
      itemWidth
    } = this.props;

    const loopVal = loop ? 1 : 0
    let pages = []
    let revealItemWidth = (width - itemWidth)/2 - grap

    const pageStyleLoading = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }

    if (!swiperDatas || swiperDatas.length === 0 ) {
      return null
    } else if (swiperDatas.length > 0) {     // For make infinite at least total > 1
      let grapView = (<View style={{width: grap, height: itemHeight}}/>)
      let revealView = (<View style={{width: revealItemWidth, height: itemHeight, backgroundColor: 'white'}}/>)

      pages.push(React.cloneElement(grapView, {key: `grapView_${-1}`}))
      pages.push(React.cloneElement(renderItem(swiperDatas[swiperDatas.length - 1]), {key: `swiperData_${-1}`}))

      swiperDatas.forEach((elem, index) => {
        pages.push(React.cloneElement(grapView, {key: `grapView_${index}`}))
        pages.push(React.cloneElement(renderItem(elem), {key: `swiperData_${index}`}))
      })
      pages.push(React.cloneElement(grapView, {key: `grapView_${swiperDatas.length}`}))

      pages.push(React.cloneElement(renderItem(swiperDatas[0]), {key: `swiperData_${swiperDatas.length+1}`}))
      pages.push(React.cloneElement(grapView, {key: `grapView_${swiperDatas.length+1}`}))

      return (
        <View style={pageStyleLoading}>
          {revealView}
          {pages}
          {revealView}
        </View>
      )
    }
  }

  renderScrollView = pages => {
    const {
      itemWidth,
      itemHeight,
      grap,
      containerStyle,
    } = this.props;

   // let revealItemWidth = (width - itemWidth)/2 - grap

    // if (Platform.OS === 'ios') {
      return (
        <ScrollView ref='scrollView'
                    {...this.props}
                    horizontal={true}
                    contentContainerStyle={[styles.wrapperIOS, containerStyle]}
                    contentOffset={this.state.offset}
                    onScrollBeginDrag={this.onScrollBegin}
                    onMomentumScrollEnd={this.onScrollEnd}
                    onScroll={this.onScroll}
                    scrollEventThrottle={100}
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}
                    snapToInterval={itemWidth + grap}
        >
          {pages}
        </ScrollView>
      )
    // }
    // return (
      // <ViewPagerAndroid ref='scrollView'
      //                   {...this.props}
      //                   initialPage={this.props.loop ? this.state.index + 1 : this.state.index}
      //                   onPageSelected={this.onScrollEnd}
      //                   key={pages.length}
      //                   style={[styles.wrapperAndroid, this.props.style]}>
      //   {pages}
      // </ViewPagerAndroid>
    // )
  }

  setItemsByIndex = (index, dataLen) => {
    const {
      swiperDatas
    } = this.props;
    let leftItemIndex = this.getLoopIndexByRemind((index - 1) % dataLen, dataLen)
    let rightItemIndex = (index + 1) % dataLen

    let leftItem = swiperDatas[leftItemIndex]
    let rightItem = swiperDatas[rightItemIndex]
    let centerItem = swiperDatas[index]

    return {leftItem, centerItem, rightItem}
  }

  getLoopIndexByRemind = (index, dataLen) => {
    let resultIndex = index
    if (resultIndex >= 0) return resultIndex
    if (resultIndex < 0) {
      while (resultIndex < 0) {
        resultIndex = resultIndex + dataLen
      }
      return resultIndex
    }
  }
}
