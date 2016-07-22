'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var App = require('../service/core.app');
var Home = require('./home.ios.js');

var {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    Component,
    AlertIOS
} = React;



class SignIn extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pass: ''
        }
    }
   
    
    updateText(tel) {
        this.setState({
            phone: tel,
        });
    }
    
    updatePass(pass) {
        this.setState({
            pass: pass,
        });
    }
    

    
    render() {
        
        return ( 
            <View style ={styles.container}>
                <Image style={styles.logo} source={{uri:'http://img1.vued.vanthink.cn/vued1c28f0d1755035791aef1741bf03aa70.jpg'}} />
                <View style={styles.signinWrap}>
                    <Text style ={styles.welcome}>
                        欢迎登录万星在线
                    </Text>
                    <Text style ={styles.desc}>
                        Welcome to Vanthink!
                    </Text>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.formControl} placeholder="手机号" onChangeText={(text) => this.setState({phone: text})} />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.formControl} placeholder="用户密码" onChangeText={(text) => this.setState({pass: text})} secureTextEntry />
                    </View>
                    <Button style={styles.btn} styleDisabled={{color: 'red'}} onPress={this._handlePress.bind(this)}>
                        登 录
                    </Button>
                </View>
              
            </View>
        );
    }
    
    
    _handlePress($event) {
        var self = this;
        this.state.phone = this.state.phone.trim();
        this.state.pass = this.state.pass.trim();
        if(this.state.phone == '') {
            return App.sendMessage('手机不能为空');
        } 
        
        if(this.state.pass == '') {
            return App.sendMessage('密码不能为空');
        }
        
        
        if (!/^1[0-9]{10}$/.test(this.state.phone)) {
            return App.sendMessage('手机号格式错误');
        }
        let passwd = this.state.pass;
      
        if (passwd.length > 20 || passwd.length < 3) {
            return App.sendMessage('密码长度只能为3-20位');
        }
        
        if (!passwd.match(/^[0-9A-Za-z]{3,20}$/)) {
            return App.sendMessage('密码格式错误!');
        }
        
        App.send('/api2/common_auth/login',{
            method: 'post',
            data:{
                phone: this.state.phone,
                password: this.state.pass
            },
            success: function(res,isSuccess) {
                console.log(isSuccess);
                if(isSuccess) {
                    if (res.data.count !== 1) {
                            
                    } else {
                        self.setLogin(res.data);
                    }
                    
                    
                }   
            }
        });
               
    }

    setLogin(data) {
        // 设置 token 以及用户信息
        App.setASCache('gloabl_login_token',data.access_token);
        App.setASCache('user',data.user);
        
        this.props.resetToRoute({
            name: '作业',
            component: Home
        });
        
    }
        
    
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#f1e7ce',
        flexWrap:'wrap',
    },
    
    logo: {
        flex:.3,
        height: 120, 
        marginBottom: 10,
    },
    signinWrap:{
        flex:.6,
        justifyContent: 'center',
        backgroundColor: '#f1e7ce',
    },
    welcome:{
        fontSize:16,
        color: '#555555',
        marginBottom: 15,
        textAlign: 'center',
    },
    desc:{
        fontSize: 14,
        color: '#999999',
        textAlign: 'center',
        marginBottom: 25,
    },
    
    inputGroup: { 
        marginBottom:10,
        
    },
    
    formControl: {
        marginLeft:10,
        marginRight: 10,
        height:35,
        borderWidth:1,
        paddingLeft:2,
        borderColor:'#dddddd',
        backgroundColor: '#ffffff',
        fontSize:14,
       
    },
    
    btn:{
        marginLeft:10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom:10,
        fontSize:16,
        backgroundColor:'#3498db',
        color:'#ffffff',
    }



});
module.exports = SignIn;