/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Css = require('./css');
import Router from 'react-native-simple-router';

var App = require('./service/core.app');

var Home = require('./pages/home.js');

import {BackIcon2} from './style/icon';

var firstRoute = {
  name: 'Home',
  component: Home,
  hideNavigationBar: true,
  statusBarProps:{statusBarHidden: true}
};
class example extends Component {
    constructor(props){
        super(props)
        this.state = {
            idx: 0,
        };
        this._handleClick = this._handleClick.bind(this);
    }
    
    _handleClick(idx) {
        this.setState({
            idx:idx
        });
    }

    
    render() {
        return (
          <Router firstRoute={firstRoute} backButtonComponent={BackIcon2} />
        );
  }
}



AppRegistry.registerComponent('example', () => example);
