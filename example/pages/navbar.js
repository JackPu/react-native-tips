'use strict';

import React,{Component} from 'react';
var Css = require('../style/css');
var App = require('../service/core.app');

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    PropTypes,
    Dimensions
}from 'react-native';

import {
    HomeIcon,
    SearchIcon,
    ReportIcon,
    BackIcon,
    CloseIcon
    

} from '../style/icon';

var styles = StyleSheet.create({

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
        letterSpacing: 0.5,
        color: '#333',
        fontWeight: '500',
    },

});

class NavBar extends Component {
    constructor(props) {
        super(props);
        

    }
    render() {

        return ( 
            <View style ={Css.container}>                
                <Text style={Css.listLable}>导航条样式</Text>
            
                <View style={[styles.navBar]}>
                    <View style={styles.navBarTitleContainer}>
                        <Text style={[styles.navBarTitleText]}>NavBar1</Text>
                     </View>
                    
                      <View style={[styles.navBarButtonContainer,{marginLeft:8}]}>
                          <TouchableOpacity style={styles.navBarButton}>
                              <View>
                                <Text style={styles.navBarButtonText}>Left </Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                      <View style={[styles.navBarButtonContainer,{marginRight:8}]}>
                          <TouchableOpacity style={styles.navBarButton}>
                              <View>
                                <Text style={styles.navBarButtonText}>Right</Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                </View>
                <Text style={Css.listLable}>导航条样式2</Text>
                <View style={[styles.navBar]}>
                    <View style={styles.navBarTitleContainer}>
                        <Text style={[styles.navBarTitleText]}>NavBar2</Text>
                     </View>
                    
                      <View style={[styles.navBarButtonContainer,{marginLeft:8}]}>
                          <TouchableOpacity style={styles.navBarButton}>
                              <View>
                                <HomeIcon></HomeIcon>
                              </View>
                          </TouchableOpacity>
                      </View>
                      <View style={[styles.navBarButtonContainer,{marginRight:8}]}>
                          <TouchableOpacity style={styles.navBarButton}>
                              <View>
                                 <ReportIcon></ReportIcon>
                              </View>
                          </TouchableOpacity>
                      </View>
                </View>
                <Text style={Css.listLable}>导航条样式3</Text>
                <View style={[styles.navBar,{backgroundColor:'#9b59b6'}]}>
                    <View style={styles.navBarTitleContainer}>
                        <Text style={[styles.navBarTitleText,{color:'#fff'}]}>NavBar3</Text>
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
                                 <Text style={[styles.navBarButtonText,{color:'#fff'}]}>Done</Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                </View>
                
            </View>
        );
    }
}

module.exports = NavBar;