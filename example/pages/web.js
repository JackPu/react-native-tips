'use strict';

import React,{Component} from 'react';
var Css = require('../style/css');
var App = require('../service/core.app');

import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    PropTypes,
    WebView,
}from 'react-native';



class Web extends Component {
    constructor(props) {
        super(props);
        let url = '';
        if(props.data.url) {
            url = props.data.url;
        }
        this.state = {
          url: 'http://events.jackpu.com/happy-children-day/',
        };

    }
        
    render() {

        return ( 
            <View style ={Css.container}>
                <WebView
                  ref={'webview'}
                  automaticallyAdjustContentInsets={false}
                  style={{flex:1}}
                  source={{uri:this.state.url}}
                  startInLoadingState={true}
                />
                
            </View>
        );
    }
}

module.exports = Web;