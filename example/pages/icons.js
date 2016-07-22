'use strict';

import React,{Component} from 'react';
var Css = require('../style/css');
var App = require('../service/core.app');
import {
    HomeIcon,
    SearchIcon,
    SmileIcon,
    CheckmarkIcon,
    ReportIcon,
    CommemtIcon,
    TimeIcon,
    BackIcon
    

} from '../style/icon';
import {
    StyleSheet,
    View,
    Text,
    Image,
    PropTypes,
    Dimensions
}from 'react-native';

var styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        borderBottomWidth:1,
        borderColor:'#ddd',
    },
    row: {
        width: Dimensions.get('window').width/4,
        height: Dimensions.get('window').width/4,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderLeftWidth:1,
        borderTopWidth:1,
        borderColor:'#ddd',
    },
    fixedBorder:{
        borderRightWidth:1,
    }

});

class Icons extends Component {
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
            <View style ={Css.container}>

                
                <Text style={Css.listLable}>Your Icons</Text>
                <View style={styles.list}>
                    <View style={[styles.row]}>
                        <HomeIcon></HomeIcon>
                    </View>
                    <View style={[styles.row]}>
                        <SearchIcon></SearchIcon>
                    </View>
                    <View style={[styles.row]}>
                        <SmileIcon></SmileIcon>
                    </View>
                    <View style={[styles.row]}>
                        <TimeIcon></TimeIcon>
                    </View>
                    <View style={[styles.row]}>
                        <CommemtIcon></CommemtIcon>
                    </View>
                    <View style={[styles.row]}>
                        <BackIcon></BackIcon>
                    </View>
                    <View style={[styles.row]}>
                        <ReportIcon></ReportIcon>
                    </View>
                    <View style={[styles.row]}>
                        <CheckmarkIcon></CheckmarkIcon>
                    </View>

                </View>
                
            </View>
        );
    }
}

module.exports = Icons;