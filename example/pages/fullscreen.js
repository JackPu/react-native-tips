'use strict';

import React,{Component} from 'react';
var Css = require('../style/css');
var App = require('../service/core.app');

import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    PropTypes,
    Dimensions
}from 'react-native';

var styles = StyleSheet.create({
    fullscreen:{
        flex:1,
        resizeMode: 'cover',
    }

});

class FullScreen extends Component {
    constructor(props) {
        super(props);
        let url = '';
        if(props.data.url) {
            url = props.data.url;
        }
        this.state = {
          url: url,
        };

    }
    render() {

        return ( 
            <Image style={styles.fullscreen} source={require('../images/cj7.png')} />
        );
    }
}

module.exports = FullScreen;