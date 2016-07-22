'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    ScrollView,
    TouchableHighlight,
    Dimensions
    
} from 'react-native';

var Css = require('../style/css');
var App = require('../service/core.app');

var Button = require('react-native-button');
var Web = require('./web');
var Percent = require('./percent');
var PageButton = require('./button');
var Icons = require('./icons');
// need tabs view github https://github.com/aksonov/react-native-tabs


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
    height: 110,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumb: {
    width: 65,
    height: 65
  },
  text:{
    fontSize:13,
  },
  btn: {
    flex: 1,
    marginTop: 10,
      padding:5,
    width:70,
    backgroundColor: '#1ba1e2',
    color: '#fff', 
    fontSize: 13,
    borderRadius:2,
  },
  
});

class Home extends Component {
    constructor(props) {
        super(props);

        this._pressRow = this._pressRow.bind(this);
        
        this.openWebview = this.openWebview.bind(this);
        this.openPercent = this.openPercent.bind(this);
        this.openIcons = this.openIcons.bind(this);
        this.openButton = this.openButton.bind(this);
      //  this.refresh();
    }
    
   
        
    
    render() {
        return ( 
            <View style ={styles.container}>
               <View style={Css.navbar}>
                 <Text style={Css.navbarText} numberOfLines={1}>
                  React native Tips
                </Text>  
                </View>

                    <ScrollView style={[Css.main,{backgroundColor:'#fff'}]}>
                        <View style={styles.list}>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/button-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>Button 按钮</Text>  
                            <Button onPress={this.openButton} numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/book-list.png')} />               
                            <Text numberOfLines={1} style={styles.text}>Grid 列表</Text>  
                            <Button numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/text-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>文字过长</Text>  
                            <Button numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/percent-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>百分比</Text>  
                            <Button onPress={()=>this.openPercent()} numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/network.png')} />               
                            <Text numberOfLines={1} style={styles.text}>网络请求</Text>  
                            <Button numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/webview-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>使用webview</Text>  
                            <Button onPress={this.openWebview} numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/setting-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>Icon 管理</Text>  
                            <Button onPress={this.openIcons} numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/nav-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>导航条</Text>  
                            <Button numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        <View style={styles.row}>
                            <Image style={styles.thumb} source={require('../images/about-ios.png')} />               
                            <Text numberOfLines={1} style={styles.text}>关于项目</Text>  
                            <Button onPress={()=>this.openWebview('关于项目介绍','https://github.com/JackPu/react-native-tips/blob/master/about-app.md')} numberOfLines={1} style={styles.btn}>
                              打开
                            </Button>
                        </View>
                        </View>
                        <View style={Css.bottomSpace}></View>
                    </ScrollView>    
                        

               
            </View>
        );
    }
    
    _handleType(idx) {
        this.setState({
            idx: idx
        });    
    }

    openPercent() {
        this. _pressRow('百分比',Percent);    
    }

    openIcons() {
        this. _pressRow('Icon 管理',Icons);    
    }

    openButton() {
        this. _pressRow('百分比',PageButton);    
    }
    
    _pressRow(title,componentname) {

        this.props.toRoute({
          name: title,
          component: componentname,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }

    

    openWebview(title,url) {
        
        this.props.toRoute({
          name: title,
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: url,
            title: '打开webview' 
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }
}

module.exports = Home;