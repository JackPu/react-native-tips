# React Native Tips <img src="https://camo.githubusercontent.com/75f980cdcda146e0f7c63dcb504deba3150695ee/68747470733a2f2f62616467652e667572792e696f2f6a732f72656163742d6e61746976652e737667"/> <img src="https://camo.githubusercontent.com/1a2ac7e3bdf80d54dae0b21f514a7ccb5c47a1fb/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f75696865726f732f72656163742d6e61746976652d72656475782d746f646f2d6c6973742e7376673f7374796c653d666c6174" ?>


<img src="http://img1.vued.vanthink.cn/vued5facf9615fae72cd5296b47d241064d1.png" />


Some tip for developing react native app.


I put code `example` here，and you can run the app：

#### screenshot1:

<img src="./screenshots/01.gif"/>



#### screenshot2:

<img src="./screenshots/02.gif"/>




## Start

``` bash
git clone https://github.com/JackPu/react-native-tips.git
```
Go to `example` directory

``` bash
react-native start
```

The use xcode to open this project and click button run。

### [About Button](https://github.com/JackPu/react-native-tips/blob/master/example/pages/button.js) 

Use `TouchableHighlight`,`TouchableOpacity` or third component [react-native-button](https://github.com/ide/react-native-button).


``` bash 
npm install react-native-button --save
```

Then you can use it below:
``` js
<Button
    style={[Css.btn,Css.btnP]}
    styleDisabled={{color: 'red'}}
    onPress={() => this._handlePress()}>
    This is a button
  </Button>
```


### [Hide long text](https://github.com/JackPu/react-native-tips/blob/master/example/pages/longtext.js)


``` javascript
<Text numberOfLines={1}>your long text here<Text>
```

### [Percent width](https://github.com/JackPu/react-native-tips/blob/master/example/pages/percent.js) 
We can use `flex` or `Dimensions`.

```
var React = require('react-native');

var {Dimensions,StyleSheet,Component} = React;
// 我们可以使用Dimensions 去获取窗口宽度
var fullWidth = Dimensions.get('window').width; 

let thirtyPercentiWidth = fullWidth * 0.3;

// Your stylesheet
var styles = StyleSheet.create({
	.wrap{
		width: thirtyPercentiWidth,
	}
});
```

### [Grid list view](https://github.com/JackPu/react-native-tips/blob/master/example/pages/grid.js)

like this：

<img src="http://img1.vued.vanthink.cn/vuedcfb38c068d0c35a44b4bbc8a37ebeb10.png"/>


### [webview](https://github.com/JackPu/react-native-tips/blob/master/example/pages/web.js)Webview is the most useful component for web developers.We can use js and html to finish some hard pages and use webiew to display them.

### [Fetch](https://github.com/JackPu/react-native-tips/blob/master/example/pages/getdata.js) 

Use HTTP fetch as a single service and use could do some more than a request(debug,data transform,handle error etc.)

### [Manage Icons](https://github.com/JackPu/react-native-tips/blob/master/example/pages/icons.js) 
Make all your icons in single file and export them by ES6.

``` js
import React, { TouchableHighlight,View,Text, Image, StyleSheet, PropTypes } from 'react-native';

// basic style
let styles = StyleSheet.create({
  icon: {
    width: 21,
    height: 21,
    marginTop: 4,
    marginRight: 15,
  }, 
});

class Icons extends React.Component { 
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
      }

      press() {
        if(typeof this.props.press == 'function') {
            this.props.press();
        }else{
            // TODO
        }
        
      }
      _renderIcon() {
        return (
            <Image source={require('../images/baseicon.png')} style={styles.icon} />
        );  
      }

      render() {
        return (
          <TouchableHighlight underlayColor="transparent" onPress={this.press}>
            {this._renderIcon()}
          </TouchableHighlight>
        );
      }
    
}

// extends
class CloseIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Delete-48.png')} style={styles.icon} />
        );  
      }
}
class SearchIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Search-50.png')} style={styles.icon} />
        );  
      }
}

// export
module.exports = {
    CloseIcon,
    SearchIcon,    
};
```


``` javascript
import {CloseIcon,SearchIcon} from '../style/icon';

...

render() {
	return(
		//... some code
		<CloseIcon></CloseIcon>
	);
}
```

<img src="http://img1.vued.vanthink.cn/vued9b724a613dd793d0e95400ff4e6884d7.png" />

###  [Make a navbar](https://github.com/JackPu/react-native-tips/blob/master/example/pages/navbar.js)


<img src="http://img1.vued.vanthink.cn/vued191da6d8d8d42ea7d69a8cf3c287cb3f.png" />



### Use the third component 

We could go [react.parts](https://react.parts/native) to search some things.And I often use these below:



* [react-native-search-bar](https://github.com/umhan35/react-native-search-bar)
一款带有常用搜索框的组件

* [react-native-refreshable-listview](https://github.com/jsdf/react-native-refreshable-listview) 一款带有刷新列表组件

* [react-native-simple-router](https://github.com/react-native-simple-router-community/react-native-simple-router)

* [react-native-video](https://github.com/brentvatne/react-native-video)

* [react-native-router-redux](https://github.com/Qwikly/react-native-router-redux)

* [react-native-image-picker](https://github.com/marcshilling/react-native-image-picker#usage) 

* [autobind-decorator](https://www.npmjs.com/package/autobind-decorator) 


### [FullScreen Image](https://github.com/JackPu/react-native-tips/blob/master/example/pages/fullscreen.js) 
Sometimes we need some fullscreen Images:

``` js
fullImage:{
    flex:1,
    resizeMode:'cover',
    
}

render() {
    return(
        <Image style={styles.fullImage}   source={require('...')}/>
    );
}
```
The iphone6 resolution is 750 * 1334 And we save it `xx@2x.png` But iphone6 plus's resolution is1225 ＊ 2001 and we sae it xx@3x.png .

<img src="http://img1.vued.vanthink.cn/vued3db04323e5109cfd9e6fbd92ba92c3bd.png" />

*iPhone resolution。*





### [Debug] (https://facebook.github.io/react-native/docs/debugging.html)
We can use `console.log`,`console.error`and `console.warn`。And also we can debug on device.

<img src="http://img1.vued.vanthink.cn/vued0b4083c14ced5cf04fbcefe13bb59238.png" />

### Contribute

This is a project for colletions of react native devoping's skills and code.
Hope you can send pull requret to it.



## MIT LICENSE


