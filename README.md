# React Native Tips <img src="https://camo.githubusercontent.com/75f980cdcda146e0f7c63dcb504deba3150695ee/68747470733a2f2f62616467652e667572792e696f2f6a732f72656163742d6e61746976652e737667"/> <img src="https://camo.githubusercontent.com/1a2ac7e3bdf80d54dae0b21f514a7ccb5c47a1fb/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f75696865726f732f72656163742d6e61746976652d72656475782d746f646f2d6c6973742e7376673f7374796c653d666c6174" ?>


<img src="http://img1.vued.vanthink.cn/vued5facf9615fae72cd5296b47d241064d1.png" />



相信好多写React Native的都是前端出身，当然遇见问题的，也很多时候会想从前端出发，但由于React Native本身的限制，并不是支持足够多的属性和样式，所以Bo主结合自己的开发实践,并总结了一些将来开发可能会遇见的问题并给出一些小的代码参考;(PS实现不好的希望能大家提出看法，自己也会更新)。

自己将代码放到了`example`下，并且做成了一个App.这样可以查看具体运行效果：

#### 截图1:

<img src="./screenshots/01.gif"/>



#### 截图2:

<img src="./screenshots/02.gif"/>




## 开始

``` bash
git clone https://github.com/JackPu/react-native-tips.git
```
进入example 目录

``` bash
react-native start
```

用xcode打开ios目录下的项目，运行就可以看到上面的运行界面了。

### 1.关于按钮

写习惯了html我们看到按钮，第一时间想到的便是Button,但是目前React Native并没有这个组件，不过没关系，我们可以使用 [TouchableHighlight](TouchableHighlight),[TouchableOpacity](https://facebook.github.io/react-native/docs/touchableopacity.html)来实现按钮组件，当然常用的样式可以应用在上面，形成格式各样的按钮。
``` js
<TouchableHighlight onPress={this._onPressButton}>
      <Text>This is Button</Text>
</TouchableHighlight>
```
如果你实在非常喜欢按钮的话，没关系，我们引入已经封装好的组件`react native button`

``` bash 
npm install react-native-button --save
```

安装好后，你就可以大胆的这样写了:
``` js
<Button
    style={[Css.btn,Css.btnP]}
    styleDisabled={{color: 'red'}}
    onPress={() => this._handlePress()}>
    This is a button
  </Button>
```

### 2.文字过长隐藏的问题

CSS3中大家可能都会用到`text-oveflow`，然而RN 的Text并没有这个属性，不过我们可以通过设置[numberOfLIne](https://facebook.github.io/react-native/docs/text.html#content) 或者JS自动计算来实现:

``` javascript
<Text numberOfLines={1}>your long text here<Text>
```

### 3.关于百分比宽度

写样式的时候有的时候我们经常会用到百分比，然而React Native并不支持这样的单位，除了用Flex布局外，我们可以通过另外一个方式获得:`Dimensions`。当然由于都是`JS`因此我们可以取巧，用JS计算下，比如30%,

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

### 4.Grid列表

在App中的常用的列表除了水平列表外，我们还需要栅格化的列表。比如类似于下面这样：

<img src="http://img1.vued.vanthink.cn/vuedcfb38c068d0c35a44b4bbc8a37ebeb10.png"/>

做出类似的界面其实只要限制住你每一个小方块的宽度就行了。

``` js
var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    width: (Dimensions.get('window').width - 30) / 3,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumb: {
    width: 55,
    height: 55
  },
  text: {
    flex: 1,
    marginTop: 10,
  }

});

// render row

 <TouchableHighlight onPress={() => this._pressRow(rowID,rowData)} underlayColor='rgba(0,0,0,0)'>
            <View>
              <View style={styles.row}>
                <Image style={styles.thumb} source={{uri: rowData['game_icon']}} />
                <Text numberOfLines={1} style={styles.text}>
                  {rowData['game_name']}
                </Text>
              </View>
            </View>
</TouchableHighlight>
```

[详细代码](https://github.com/JackPu/react-native-tips/blob/master/example/pages/home.js)


### 5.混合使用webview

无论什么时候，作为一个前端er，在遇到比较棘手的问题时候，我们都可以回到原点，用一个网页去解决。因此无论如何都需要学会使用React Native webview。除此之外，部分页面，其实完全可以由网页去支持**多端**共用的功能，楼主亲身遇到过的场景，就是图表的绘制，我们的方案是一个页面，需要微信，手机网页，和android,ios都具备该功能，而且我们手机网页和客户端打开的稍微有区别，需要隐藏header。

<img src="http://img1.vued.vanthink.cn/vuedc026487dfb0a62593d61ac2927fa727c.png" />


上图是网页版本的，而我们通过设置页面的查询参数即来自客户端的请求或者微信的都会设置为类似这样的url
``` bash
https://xxx.yoursites.com/page.html?hide_header=1&client=ios
```


<img src="http://img1.vued.vanthink.cn/vueda93127c21932b45b981c0d785f7c284f.png" />

而在React Native 设置webview 的代码也很简单，你可以查看这里[代码](https://github.com/JackPu/react-native-tips/blob/master/example/pages/web.js)

### 6.设置网络请求Fetch

由于客户端也需要大量接口的支持，因此我们一定避免单兵作战，需要请求时候用个`fetch`，这样其实非常不易控制数据的流入。建议在fetch上在封装一次，这样我们就可以做更多的事情，比如做统一的错误提示，用户失效控制，统一设置接口请求的header,同时可以方便我们进行调试，在chrome中查看具体的接口数据等。

``` js
send(url,options) {
        var isLogin = this.isLogin();
        
        var self = this;        
        var defaultOptions = {
            method: 'GET',
            error: function() {
                options.success({'errcode':501,'errstr':'系统繁忙,请稍候尝试'});
            },
            headers:{
                'Authorization': this.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'App': 'vanthink-ios-app'
            },
            data:{
                // prevent ajax cache if not set 
                '_regq' : self.random()
            },
            dataType:'json',
            success: function(result) {}
        };
        
        var options = Object.assign({},defaultOptions,options);
        var httpMethod = options['method'].toLocaleUpperCase();
        var full_url = '';
        if(httpMethod === 'GET') {
            full_url = this.config.api +  url + '?' + this.serialize(options.data);
        }else{
            // handle some to 'POST'
            full_url = this.config.api +  url;
        }
        
        if(this.config.debug) {
            console.log('HTTP has finished %c' + httpMethod +  ':  %chttp://' + full_url,'color:red;','color:blue;');
        }
        options.url = full_url;
        
        
        var cb = options.success;
      
        // build body data 
        if(options['method'] != 'GET') {
            options.body = JSON.stringify(options.data);
        }
  
        // todo support for https
        return fetch('http://' + options.url,options)
               .then((response) =>  response.json())
               .then((res) => {      
                    self.config.debug && console.log(res);
                    if(res.errcode == 101) {
                        return self.doLogin();
                    }

                    if(res.errcode != 0) {

                        self.handeErrcode(res);
                    }  
                    return cb(res,res.errcode==0);
                })
                .catch((error) => {
                  console.warn(error);
                });
    },
    
    
    handeErrcode: function(result) {
        // not login
        if(result.errcode == 123){
           // your code to do
            
            return false; 
        }
       
        return this.sendMessage(result.errstr);
    },
```



### 7.管理你的Icon

在网页中我们经常可以看到非常多的小的icon，我们习惯性的用Css Sprite 和 Icon Font或者 Svg去解决这些问题。移步到客户端，同样，我们也有很多解决方案，但是有一点必须要明确，将icon放到同一个地方，方便管理。这里有很多第三方库选择：

+ [react-native-icons](https://github.com/corymsmith/react-native-icons)

+ [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

如果自己写的话，可以写到一个组件中，通过设置一个基类，然后进行继承和导出。设置不同的图标思路大概如下：

``` js
import React, { TouchableHighlight,View,Text, Image, StyleSheet, PropTypes } from 'react-native';

// 基本的样式
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

// 继承
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

// 导出
module.exports = {
    CloseIcon,
    SearchIcon,    
};
```

而我们则可以在页面中这样使用

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



### 8.构建一个导航条

当然制作App中，我们经常会遇到制作导航条的要求,

<img src="http://img1.vued.vanthink.cn/vued191da6d8d8d42ea7d69a8cf3c287cb3f.png" />

大家可以使用[react-native-navbar](https://github.com/react-native-community/react-native-navbar),自己写也非常简单，样式大致就这些:

``` js
	navBar: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#fff'
    },
    customTitle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 7,
        alignItems: 'center',
    },
    navBarButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    navBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarButtonText: {
        fontSize: 17,
        letterSpacing: 0.5,
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleText: {
        fontSize: 17,
        color: '#333',
        fontWeight: '500',
    }
```

用法如下:

``` js
<View style={[styles.navBar,{backgroundColor: '#9b59b6'}]}>
    <View style={styles.navBarTitleContainer}>
        <Text style={[styles.navBarTitleText,{color: '#fff'}]}>NavBar3</Text>
    </View>

    <View style={[styles.navBarButtonContainer,{marginLeft:8}]}>
        <TouchableOpacity style={styles.navBarButton}>
            <View>
                <CloseIcon></CloseIcon>
            </View>
        </TouchableOpacity>
    </View>
    <View style={[styles.navBarButtonContainer,{marginRight:8}]}>
        <TouchableOpacity style={styles.navBarButton}>
            <View>
                <Text style={[styles.navBarButtonText,{color: '#fff'}]}>Done</Text>
            </View>
        </TouchableOpacity>
    </View>
</View>
```

*需要注意，如果设置顶部导航条，记得还有状态栏的高度要算进去，一般设置都为`22`*







### 9.结合 Redux
想了想做个 App，有下面几个就可以了，界面不low, 数据支撑，用户响应即可。但是我们在做的时候Css和Html确实解决了Bo主不会写界面的问题，但是后面两个咋个办呢？于是乎官方推出了一个新的工具[Redux]()。
精炼一点就是Redux就是去去管理页面的状态（用户响应）及数据（接口数据相关）。Redux中强调了三点:
+ 单一数据源
+ State 是只读的
+ 使用纯函数来执行修改

而且Redux支持服务端，这样更加方便我们在进行异步的远程数据获取的实现。

[一个简单的使用Demo](https://github.com/alinz/example-react-native-redux)

### 10.合理的使用第三方插件

尽管React Native 正式发布的时间还不算非常长，但是npm上已经拥有了大量的第三方类库，因此我们在遇到问题或者强调快速开发的时候我们可以去第三方网[react.parts](https://react.parts/native)站寻找更好的组件。自己觉得常用的一些如下：

+ [react-native-search-bar](https://github.com/umhan35/react-native-search-bar)
一款带有常用搜索框的组件

+ [react-native-refreshable-listview](https://github.com/jsdf/react-native-refreshable-listview) 一款带有刷新列表组件

+ [react-native-simple-router](https://github.com/react-native-simple-router-community/react-native-simple-router)

+ [react-native-video](https://github.com/brentvatne/react-native-video)

+ [react-native-router-redux](https://github.com/Qwikly/react-native-router-redux) 一款路由和redux结合的插件，组件比较丰富

+ [react-native-image-picker](https://github.com/marcshilling/react-native-image-picker#usage) 一款选择图片的插件

+ [autobind-decorator](https://www.npmjs.com/package/autobind-decorator) 省去每次都要声明`eventHandle.bind(this)`


### 11.全屏图片

可能大家经常会遇到制作landing 页面，这个时候很多时候都是一个全屏的入场的图片，这个时候我们就需要设置好图片的样式。

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
一般我们都设置iphone6 的全屏大小为750 * 1334 保存为xx@2x.png 而6 plus一般是1225 ＊ 2001 命名成xx@3x.png就行，这样不同的型号会去寻找对应的图片。

<img src="http://img1.vued.vanthink.cn/vued3db04323e5109cfd9e6fbd92ba92c3bd.png" />

*iPhone各型号分辨率一览。*





### 12.调试

除了开发外，我们还希望能够很好的调试我们的App.默认的话，就像我们调试我们的web页面一样，我们可以用常用的`console.log`,`console.error`,`console.warn`，由于支持chrome调试，我们可以在控制台看到打印的数据。当然，我们也可以真机调试，比如连上你的iPhone,需要注意的是:

> 你需要修改调试js的地址，在`AppDelegate.m`中将"localhost"改成你电脑的ip就可以了。

选中你的iPhone就可以调试了。
<img src="http://img1.vued.vanthink.cn/vued0b4083c14ced5cf04fbcefe13bb59238.png" />

### 13. 替换启动图标以及修改App名称

如果我们项目做到差不多的时候，我们就会开始注重外观了。作为界面上的启动图标必然需要静心设计。当我们拿到设计稿的时候，我们只需要完成几个简单步骤就可以咯。

由于不同设备的不同分辨率，我们需要准备不同大笑的图标。推荐一个自动生成手机启动图标的网站 [makeappicon.com](http://makeappicon.com/)。下载完成后大概文件里面就会有你所需要的图标的文件目录了。

<img src="http://img1.vued.vanthink.cn/vued8383666d0bef27cf1a4d86fdd0e2e4c6.png"/>

在ios中我们只需要打开`images.xcassets`目录中，用下载ios目录中的图标图片替换到Xcode图片资源`AppIcon.appiconset`中就行啦。

android的话，替换到对应资源文件目录中的ic_launcher.png中就欧啦。

<img src="http://img1.vued.vanthink.cn/vued8d5ea5d297319adefcf587990ab966ab.png" />


关于修改App名称的话，就相对简单了，在xcode项目中打开，点击到build settings中到Packaging中设置即可。

<img src="http://img1.vued.vanthink.cn/vued5d7b7197bdf6cab7d94bbcdded495640.png"/>

### 14. 修改React Native启动画面

我们在经常刷新或者启动React Native App时候都能看到这样的画面：

<img src="http://img1.vued.vanthink.cn/vued61f6960a844b96465abcf3b73c4fb3d7.png"/>

用Xcode打开项目，点击LaunchScreen.xib就可以看到这个启动画面了，你可以直接在窗口中进行编辑内容。

<img src="http://img1.vued.vanthink.cn/vued7534fce2df5f2dcfe1c0375fdc3fe2fa.png" />

不过我们这里讲的是是讲启动画面改成我们想要的图片。同样的图片资源需要多个分辨率，推荐去[TiICons](http://ticons.fokkezb.nl/)进行自动处理，你可以上传一张2208 x 2208的图片，程序会自动裁剪成iphone和android所需图片大小。然后下载即可。

<img src="http://img1.vued.vanthink.cn/vued6780436a18d056a5fc3ba5e4fca42bc2.png" />


我们在images.xcassets目录中新建一个目录叫做`LaunchImage.launchimage`，然后将下载的目录中app/assets/iphone里面的图片复制进去。然后我们在LaunchImage.launchimage中新建Cotents.json，用于标示不同分辨率的图片适配。
``` js
{
  "images": [
    {
      "extent": "full-screen",
      "idiom": "iphone",
      "filename": "Default-568h@2x.png",
      "minimum-system-version": "7.0",
      "orientation": "portrait",
      "scale": "2x",
      "subtype": "retina4"
    },
    {
      "extent": "full-screen",
      "idiom": "iphone",
      "filename": "Default-667h@2x.png",
      "minimum-system-version": "8.0",
      "orientation": "portrait",
      "scale": "2x",
      "subtype": "667h"
    },
    {
      "extent": "full-screen",
      "idiom": "iphone",
      "filename": "Default-Landscape-736h@3x.png",
      "minimum-system-version": "8.0",
      "orientation": "landscape",
      "scale": "3x",
      "subtype": "736h"
    },
    {
      "extent": "full-screen",
      "idiom": "iphone",
      "filename": "Default-Portrait-736h@3x.png",
      "minimum-system-version": "8.0",
      "orientation": "portrait",
      "scale": "3x",
      "subtype": "736h"
    },
    {
      "extent": "full-screen",
      "idiom": "iphone",
      "filename": "Default@2x.png",
      "minimum-system-version": "7.0",
      "orientation": "portrait",
      "scale": "2x"
    }
  ],
  "info": {
    "version": 1,
    "author": "xcode"
  }
}

```
然后我们根据情况删除一些图片，主要是横屏的不需要的图片。然后我们点击xcode中项目主要信息那里，

<img src="http://img1.vued.vanthink.cn/vuedd2d81e955dd56d16e4e400304b045ac8.png" />

然后将launch image source 指定到你刚刚设置的LaunchImage目录即可。

<img src="http://img1.vued.vanthink.cn/vuedc9422ad8e08543e22c5947182ff7d061.png" />

然后重新build，记得将模拟器的App先删除再build。




## 贡献

本项目用于搜集开发React Native的一些常用技巧和总结，**会不断的更新**，同时会将代码放置到`example`中。

欢迎大家PR.


<img src="http://img1.vued.vanthink.cn/vuedf40e6bef8963252bd7eaa81f689e5c56.jpg" />

最后安利一个ppt https://yunpan.cn/cqKEvrPXAS3gy （提取码：0375）


## MIT LICENSE

[English Document](https://github.com/JackPu/react-native-tips/blob/master/README.en.md)
