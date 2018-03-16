# react-native-global-UI

#### react-native-global-UI provide some UI which can use with API.
#### User can use those UI in everyWhere without declare them in JSX


# Usage
================================================

## Install

For IOS and Android:

```
    npm install react-native-global-ui --save
```

## Code

### 1）import UI

```
import {
  Loading
} from 'react-native-global-ui'
```

### 2）show it！

```
Loading.show()
```

### 3) hide it!

```
Loading.hide()
```

# Componet
================================================

### mask view (private， common)

Mask view is a wrap view behide our global View. 
####type

It have three type: 'none', 'block', 'full'.

| type      | effect  |
| :-------- | :--: |
| none   |  there has nothing behind global view， you can click other button and view |
| block   | there has an Opacity mask behind global view， but the navigation bar can be clicked    |
| full   |  Full screen are covered by mask, you can do nothing before call hide   |

#### Props

| Prop | Type | Description |
|---|---|---|
|**`maskType`**|`PropTypes.oneOf(['none','block','full'])`| _Default full._|
|**`blockHeight`**|`?number`|Effect when type is block. _Default (Platform.OS === 'ios' ? 44 : 56)._|
|**`maskStyle`**|`ViewPropTypes.style`|react native element style.  _Default { backgroundColor: 'black'}._|
|**`bgClose`**|`?bool`|Click mask to close UI when true. _Default false._|
|**`opacity`**|`?number`|Opacity of mask _Default 0.3._|

*****************************************

### Loading (Public) 

Loading is used to indicate some asynchronous operations。

#### Props

| Prop | Type | Description |
|---|---|---|
|**`loadingText`**|`?PropTypes.string`|Loading text. _Default 加载中._|
|**`loadingTextStyle`**|`?Text.propTypes.style`|Loading text style|
||||
|**`indicatorStyle`**|`?ViewPropTypes.style`|Indicator Style.  _Default { : 'black'}._|
|**`indicatorSize`**|`?PropTypes.oneOfType([PropTypes.oneOf([ 'small', 'large' ]),PropTypes.number ])`|Indicator Size. _Default 'large'._|
|**`indicatorColor`**|`?ColorPropType`|Indicator color  _Default 'white'._|
||||
|**`customLoadingElem`**|`?PropTypes.element`|If you need to customize your own components, you can use this props|

#### Usage

we offer two method to use Loading：

1. Loading 

```
import {
  Loading
} from 'react-native-global-ui'


Loading.show({
    props
})
```
In this way, The function accepts an Object as an argument, and Object stores the required props for loading.

Loading.show({maskType: 'block',loadingText: 'nav可点哦'})
Loading.show({loadingText: 'loading Text'})

2. LoadingBuilder

```
import {
  LoadingBuilder
} from 'react-native-global-ui'

LoadingBuilder().injectParams({prpos}).show()
```

In this way, User can Call by chain and use some more understandable functions.

LoadingBuilder().setMaskType('none').setLoadingTextStyle({'color': 'red', fontSize: 20}).show()

LoadingBuilder().setLoadingText('loading Text').show()

##### chains func

| func | params | Description |
|---|---|---|
|**`injectParams`**|`Object`|Accept all props .|
|**`injectMaskParams`**|`Object`|Accpet mask props see above.|
|**`injectIndicateParams`**|`Object`|Accpet indicate props see above.|
|**`setMaskType`**|`PropTypes.oneOf(['none','block','full'])`|set mask type|
|**`setLoadingText`**|`String`||
|**`setLoadingTextStyle`**|`?Text.propTypes.style`||
|**`setCustomLoading`**|`?PropTypes.element`||


You can find some examples in example project 
