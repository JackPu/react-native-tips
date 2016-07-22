// style files
'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

let fullWidth = Dimensions.get('window').width; 
var Css = StyleSheet.create({

    // gloabl css

    gLoading: {
        height: 60,
        width: 60,
        marginTop: 120
    },
    
    gmt10:{
        marginTop:10,
    },

    container: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        position:'relative',
    },
    modalContainer: {
        backgroundColor: '#f1f1f1',
        flex: 1,
        position:'relative',
        marginTop:22,
    },
    // navbar
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#2980b9',
    },
    navbarText: {
        color: 'white',
        fontSize: 17,
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
    },
    corner: {
        flex:1,
        justifyContent: 'center',
    },
    navbarAvatar:{
        width: 22,
        height: 22,
        borderRadius: 11,
    },
    
    alignLeft: {
        marginLeft:10,
        alignItems: 'flex-start',
    },
    alignRight: {
        alignItems: 'flex-end',
    },
    buttonTextLeft: {
        marginLeft: 10,
    },
    buttonTextRight: {
        marginRight: 10,
    },
    main: {
        position:'relative',
        top:44,
        left:0,
        right:0,
        paddingBottom: 55,
    },


    // footer tab style

    ftTab: {
        fontSize: 12,
    },

    icon: {
        width: 21,
        height: 21,
        marginTop: 4,
    },
    
    // list view
    listLable: {
        fontSize: 12,
        marginLeft: 15,
        marginTop: 25,
        marginBottom: 10,
        color:'#999',
    },
    
    row: {
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection:'row' ,
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff', 
    },
                            
    col3: {
        flex: 1, 
        height: 153,
        alignItems: 'center',
        marginTop:10,
        
    },
    
    listRow: {
        height: 44,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor: '#ddd',
        backgroundColor:'#fff',
        
        
    },
    listRowText: {
        fontSize:17,
        marginLeft:10,
        color: '#777',
    },
    listRowIcon:{
        width:17,
        height:17,
        marginRight:10,
    },
    
    bottomSpace: {
        height:98
    },  
    
    spaceWrap:{
        height:10,
    },
    
    // form 
    btnWrap:{
        marginTop:15,
    },
    
    btn:{
        marginLeft:10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom:10,
        fontSize:16,
        backgroundColor:'#3498db',
        color:'#ffffff',
    },
    
    errorView:{
        marginTop:15,
        width: fullWidth,
        height:280,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff',
        flex:1,
    },
    
    errorIcon: {
        width: 100,
        height: 100,
    },
    
    errorText: {
        fontSize: 16,
        marginTop: 20,
        textAlign:'center',
        marginLeft:0,
        marginRight:0,
    }
    
                            

});


module.exports = Css;