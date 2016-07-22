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
                            <Button numberOfLines={1} style={styles.btn}>
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
                            <Button numberOfLines={1} style={styles.btn}>
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
                            <Button numberOfLines={1} style={styles.btn}>
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
                            <Button numberOfLines={1} style={styles.btn}>
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
    
    _pressRow(rowID,rowData) {
        console.log(rowID);
        return;
        this.props.navChange({
          name: "反馈",
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: rowData['game_url'],
            title: 'dakaz' 
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }

    openWebview() {
        
        this.props.toRoute({
          name: "打开webview",
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: 'http://events.jackpu.com/happy-children-day/',
            title: '打开webview' 
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }
}

module.exports = Home;