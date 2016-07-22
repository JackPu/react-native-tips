'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var Css = require('../style/css');
var App = require('../service/core.app');
var Web = require('./web');
var Card = require('./more/card');
var {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    ScrollView,
    TouchableHighlight,
    PropTypes,
    Component
} = React;

// need tabs view github https://github.com/aksonov/react-native-tabs


var styles = StyleSheet.create({
    profileView: {
        height: 200, 
    },
    bannar: {
        height: 100,
        backgroundColor: '#4aa3df',
    },
    profileDetails:{
        position: 'relative',
        height: 100,
        alignItems:'center',
    },
    
    profileAvatar:{
        width: 90,
        height: 90,
        borderRadius: 45,
        marginTop: -40,
    },
    profileUsername: {
        fontSize: 22,
        paddingTop:10,
    },
    edit:{
        fontSize: 16,
        paddingTop: 5,
        color: '#4aa3df',
    },
    griftRow: {
        height: 153,
    },
    gift: {
        width: 64,
        height: 64,
    },
    label: {
        fontSize: 14,
        lineHeight: 18,
        color: '#999999',
    },
    number: {
        fontSize: 18,
        color: '#111',
        paddingTop: 5,
    }
});

class Profile extends Component {
    constructor(props){
        super(props);
        let funcList = [{
            'name': 'setting',
            'text': '消息',
        },
        {
            'name': 'help',
            'text': '教材',
        }];
        let navList = [{
            'name': 'setting',
            'text': '设置',
        },
        {
            'name': 'help',
            'text': '帮助与支持',
            'url': 'http://h5.online.vanthink.cn/index/feedback',
        },
        {
            'name': 'feedback',
            'title': '反馈',
            'url': 'h5.online.vanthink.cn/wechat/Vanthink/message',
        },
        {
            'name': 'aboutUs',
            'text': '关于我们',
            'url': 'http://h5.online.vanthink.cn/student#!/app/version'
        },
        {
            'name': 'edit',
            'text': '编辑资料',
            'url': 'http://h5.online.vanthink.cn/user/edit'
        },
        {
            'name': 'message',
            'text': '消息',
            'url': 'http://h5.online.vanthink.cn/student#!/common/request-message'
        },
        {
            'name': 'chart',
            'text': '轨迹',
            'url': 'http://h5.online.vanthink.cn/student#!/record'
        }
        ];
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.navList = navList;
        this.state = {
            user: {
                head_url: 'http://img1.vued.vanthink.cn/vudeaW1naW4wOjAyOjA0MzY0OjMw.jpeg',
                username: '加载中...'
            },
        };
        this._onChangeRoute = this._onChangeRoute.bind(this);
        this._viewCard = this._viewCard.bind(this);
        this.refresh();
        
       
    }
    
    refresh(){
        let self = this;
        App.send('/api/user_profile/getUserInfo',{
            success: function(res,isSuc) {
                if(isSuc) {
                    self.setState({
                        user: res.data
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
    
    _viewCard() {
        this.props.navChange({
          name: '卡片详情' ,
          component: Card,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            cardno: '',
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }
    
    
    render() {
        var me = this;
        
        if(this.user !== false) {
           // this.user = {};
        }
        
        return (
          <View style={Css.container}>
            <View style={Css.navbar}>
                 <Text style={Css.navbarText} numberOfLines={1}>
                  个人中心
                </Text>  
            </View>
            <ScrollView style={Css.main}>
                <View style={styles.profileView}>
                    <View style={styles.bannar}></View>
                    <View style={styles.profileDetails}>
                        <Image source={{uri: this.state.user.head_url}} style={styles.profileAvatar}/>
                        <Text style={styles.profileUsername}>{this.state.user.username}</Text>
                        <TouchableOpacity onPress={()=>this._onChangeRoute(4)}>
                            <Text style={styles.edit}>编辑资料</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={Css.listLable}>个人信息</Text>
                <View style={[Css.row,styles.griftRow]}>
                    <View style={Css.col3}>
                        <Image style={styles.gift} source={require('../images/app-ios-profile-star.png')} style={styles.gift}/>
                        <Text style={styles.label}>经验值</Text>
                        <Text style={styles.number}>{this.state.user.stars}</Text>
                    </View>
                    <View style={Css.col3}>
                        <Image style={styles.gift} source={require('../images/app-ios-profile-gift.png')} style={styles.gift}/>    
                        <Text style={styles.label}>财富值</Text>
                        <Text style={styles.number}>{this.state.user.integrals}</Text>
                    </View>
                    <View style={Css.col3}>
                        <Image style={styles.gift}  source={require('../images/app-ios-profile-sun.png')} style={styles.gift}/>
                        <Text style={styles.label}>珍宝值</Text>
                        <Text style={styles.number}>{this.state.user.sun_num}</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={() => this._viewCard(2)}>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>卡片</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                                                                                                               <TouchableHighlight onPress={() => this._onChangeRoute(6)}>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>轨迹</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                                                                                              <TouchableHighlight onPress={() => this._onChangeRoute(5)}>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>消息</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                                                                            
                <Text style={Css.listLable}>其他</Text>
                <TouchableHighlight onPress={() => this._onChangeRoute(1)}>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>帮助与支持</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this._onChangeRoute(2)}>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>反馈</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this._onChangeRoute(3)}>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>版本</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                <Text style={Css.listLable}>系统</Text>
                <TouchableHighlight>
                  <View style={Css.listRow}>
                    <Text style={[Css.alignLeft,Css.listRowText]}>退出</Text>
                    <View style={Css.corner}></View>
                    <Image style={[Css.alignRight,Css.listRowIcon]} source={require('../images/Forward-50.png')} />
                  </View>
                </TouchableHighlight>
                <View style={Css.bottomSpace}></View>                                                           
            </ScrollView>
          </View>
        );
  }
}



module.exports = Profile;