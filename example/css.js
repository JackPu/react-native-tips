// style files
'use strict';

var React = require('react-native');
var {
    StyleSheet,
} = React;

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
    statusbar:{
        height:22,
        backgroundColor: '#1ba1e2',
    },
    // navbar
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 66,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#1ba1e2',
    },
    navbarText: {
        color: 'white',
        fontSize: 17,
        margin: 10,
        marginTop: 22,
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
        top:66,
        left:0,
        right:0,
        paddingBottom: 55,
    },
    thumb:{
        marginTop:20,
        width: 200,
        height: 200,
    },

    welcome:{
        fontSize:20,
        color: '#222',
    },
    
    welcome2:{
        color: 'red',
    }
    
                            

});


module.exports = Css;