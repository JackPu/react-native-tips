'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    Component
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    
    logo: {
        width: 260,
        height: 150, 
        marginBottom: 20,
    },
    version:{
        fontSize:16,
        color: '#555555',
        marginBottom: 15,
    },
    footer:{
        fontSize: 14,
        color: '#999999'
    },



});

class HomeworkHome extends Component {
     
    render() {
        return ( 
            <View style ={styles.container}>
                <Image style={styles.logo} source={{uri:'http://img1.vued.vanthink.cn/vued462d6e1cb16a57f1ddfd7112906cf62a.png'}} />
                <Text style ={styles.version}>
                    Version 1.01 
                </Text> 
                <Text style ={styles.footer}>
                    CopyRight &copy; Vanthink Edu Teach.inc 
                </Text> 
              
            </View>
        );
    }
}

module.exports = AboutUs;