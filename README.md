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

Mask view is a wrap view behide our global View. It have three type: 'none', 'block', 'full'.

| type      | effect  |
| :-------- | :--: |
| none   |  there has nothing behind global view， you can click other button and view |
| block   | there has an Opacity mask behind global view， but the navigation bar can be clicked    |
| full   |  Full screen are covered by mask, you can do nothing before call hide   |

