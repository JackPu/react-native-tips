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
    list:{
        
        flexDirection:'row',
        justifyContent:'flex-start',
        flexWrap: 'wrap',
        paddingTop:10,
        
    },
    item:{
        //flex:.5,
        width:(Dimensions.get('window').width - 30)/2,
        height: (Dimensions.get('window').width - 30)/2 + 60,
        marginLeft:10,
        marginBottom:10,
        paddingBottom:10,
        backgroundColor:'#fff',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0
        }
        
    },
    photo:{
        
        height:(Dimensions.get('window').width - 30)/2,
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
    name:{
        flex:1,
        fontSize:16,
        color: '#555',
        
    },
    
});

class Grid extends Component {
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
        
    componentDidMount() {
        var self = this;
        //App.send('',{});
         App.getUser(function(user) {
            self.setState({
                user: user
            });
            
        }).done();
    }

    _onChangeRoute(idx) {

        this.props.navChange({
          name: this.navList[idx]['name'] ,
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: this.navList[idx]['url'],
            title: this.navList[idx]['name']  
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }
    
   
    _renderRowView(rowData) {
        return (

            <View style={styles.item}>
                <Image style={styles.photo} source={{uri: rowData.src}} />   
                <View style={styles.textView}>
                    <Text style={styles.name} numberOfLines={1}>{rowData.name}</Text>  
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
            <ListView style={Css.container} contentContainerStyle={styles.list}
                  renderRow={this._renderRowView}
                  dataSource={this.state.list}>
            </ListView>
        );
  }
}



module.exports = Grid;