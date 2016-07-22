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
    PropTypes,
    Dimensions
} from 'react-native';
    
var Button = require('react-native-button');
var Css = require('../style/css');
var App = require('../service/core.app');

var LoadingSpinner = require('../components/loadingspinner');
import {IdeaIcon,UserIcon} from '../style/icon';

var styles = StyleSheet.create({
    row:{
        flex:1,
        backgroundColor:'#fff'
        
    },
    photo:{
        flex:1,
        height:Dimensions.get('window').width,
        marginBottom:10,
    },
    textView:{
        position:'relative',
        height:40,
        padding:10,  
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        
    },
    alignRight:{
        position:'absolute',
        right:10,
        top:5,
        flexDirection: 'row',
        alignItems:"flex-end",
    },
    name:{
        flex:1,
        fontSize:16,
        color: '#1ba1e2',
        
    },
    box:{
        marginRight:0,
        fontSize:18,
        color:'#222',
        textAlign:'right',
    },
    textView2:{ 
        marginLeft:10,
        paddingBottom:15,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    roletext:{
        flex:1,
        fontSize:14,
        color: '#666',
        marginTop:4,
    },
    dateText:{
        fontSize:13,
        color:'#888',
        marginLeft:15,
    }
});

class GetData extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            list: false,
        };

        this.refresh();
        
       
    }
    
    refresh(){
        let self = this;
        App.send('/react-native-tips/data/data.php',{
            success: function(res,isSuc) {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                if(isSuc) {
                    self.setState({
                        loading:false,
                        list: ds.cloneWithRows(res.data)
                    });
                }
            }
        })    
    
    }
        


   
   
    _renderRowView(rowData) {
        return (

            <View style={styles.row}>
                
                <Image style={styles.photo} source={{uri: rowData.src}} />   
                <View style={styles.textView}>
                    <Text style={styles.name} numberOfLines={1}>{rowData.name}</Text>  
                    <View style={styles.alignRight}>
                        <IdeaIcon></IdeaIcon>
                        <Text style={styles.box} numberOfLines={1}>{rowData.box}</Text>  
                    </View>
                </View>
                <View style={styles.textView2}>
                    <Text style={styles.roletext} numberOfLines={1}>{rowData.role}</Text>   
                </View>
            </View>       
        );
    }
    
    render() {
        var me = this;
        
        if(this.state.loading) {
            return (
                <LoadingSpinner></LoadingSpinner>
            );
        }
        
        return (
            <ListView style={[Css.container]}
                  renderRow={this._renderRowView}
                  dataSource={this.state.list}>
            </ListView>
        );
  }
}



module.exports = GetData;