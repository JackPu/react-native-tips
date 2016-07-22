'use strict';

var React = require('react-native');
var App = require('../service/core.app');
var GiftedListView = require('react-native-gifted-listview');
var Css = require('../style/css')
var homeworkDetail = require('./homework/detail');
var Web = require('./web');
var {
    StyleSheet,
    View,
    Text,
    Image,
    Component,
    TouchableHighlight,
    TouchableOpacity,
    ListView,
    Dimensions
} = React;

import {GiftIcon} from '../style/icon';

var fullWidth = Dimensions.get('window').width; 

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
    },
    
    loading: {
        width:30,
        resizeMode: 'contain',
    },
    row:{
        flex:1,
        width:fullWidth,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    homeworkItem: {
        position:'relative',
        height: 95,
        backgroundColor: '#ffffff',
        paddingTop:10,
        paddingBottom:10,
        flex:1,
        flexDirection: 'row',
        
    },
    
    homeworkCircle:{
        overflow: 'hidden',
        width:61,
        height:61,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        borderWidth:2,
        borderColor:'#bdc3c7',
        borderRadius: 32,
    },
    
    avatar: {
        width:61,
        height:61,
    },
    
    homeworkContents:{
        position:'relative',
        marginLeft:10,
        flex:1,
        flexDirection:'column',
    },
    tag: {
        position:'absolute',
        top:0,
        right:10,
        paddingTop:3,
        paddingRight:4,
        paddingBottom: 3,
        paddingLeft:4,
        backgroundColor: '#399bdc',
    },
    
    tag_green:{
        backgroundColor: '#2ecc71',
    },
    
    tag_red: {
        backgroundColor: '#e74c3c',
    },
    
    tagtext:{
        color:'#fff',
        fontSize:12,    
    },
    homeworkName:{
        fontSize:17,
        marginBottom:10,
        lineHeight:34,
    },
    
    homeworkTime:{
        fontSize:11,
        color: '#999999',
    }
    
    


});

class Tag extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        let rowData = this.props.data;

        if(rowData.homework_mode==1&&rowData.overdate==true) {
             return( <View style={[styles.tag,styles.tag_red]}>
                <Text style={styles.tagtext}>已过期</Text>
            </View> 
            );   
        }
        if(rowData.finish_status==100) {
             return (<View style={[styles.tag,styles.tag_green]}>
                <Text style={styles.tagtext}>已完成</Text>
            </View>
            );    
        }
        
        return (<View style={styles.tag}>
            <Text style={styles.tagtext}>未开始</Text>
        </View>
        );
             
    }
}

class Homework extends Component {
    
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this._renderRowView = this._renderRowView.bind(this);
        this.pressGift = this.pressGift.bind(this);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            list: false,
            loading: false,
            pageno: 1,
        }
        
       
        
    }
    
    refresh(callback) {
        var self = this;
        this.setState({
            loading: true
        });
        if(self.state.list.length == self.state.max && self.state.max>0){
            return callback(self.state.list,{
                allLoaded: true, 
            });
        }
        App.send('/api/homework_sturecent/index',{
            data:{
                pagesize: 10,
                pageno: this.state.pageno
            },
            success: function(result,isSuccess) {
                if(isSuccess) {
                    
                    self.setState({
                        list: result.data.list,
                        max: result.data.count,
                        loading: false
                    });
                   
                    callback(result.data.list);
                }else{
                    self.setState({
                        list: [],
                        max: 0,
                        loading: false
                    }); 
                    callback([]);
                }
            }
        });
    }
    
    componentDidMount() {
      //  this.refresh();
    }
    
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Image style={styles.loading} source={require('../images/712.gif')} />
            </View>
        );
    }
    
    _onFetch(page = 1, callback, options) {
        this.setState({
            pageno: page
        });
        
        this.refresh(callback); 
    }
    
    _renderRowView(rowData) {
        return (
          <TouchableHighlight
            style={styles.row}
            underlayColor='#c8c7cc'
            onPress={() => this._onPress(rowData)}
           >
            <View style={styles.homeworkItem}>
                <View style={styles.homeworkCircle}>
                    <Image style={styles.avatar} source={{uri: rowData.head_url}} />   
                </View> 
                <View style={styles.homeworkContents}>
                    <Text style={styles.homeworkName} numberOfLines={1}>{rowData.homework_name}</Text>    
                    <Text style={styles.homeworkTime}>{rowData.upload_time}</Text>  
                    
                    <Tag data={rowData}></Tag>
                </View>
            </View>       
          </TouchableHighlight>
        );
    }
    
    _onPress(rowData) {
        this.props.navChange({
          name: rowData['homework_name'],
          component: homeworkDetail,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            no: rowData['homework_no'],
            teacher: rowData['teacher_name'] ,
            name: rowData['homework_name'],
            navChange:  this.props.navChange,
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });    
    }

    _renderEmptyView() {
        return (
            <View style={Css.errorView}>
                <Image style={Css.errorIcon} source={require('../images/ICON-VANTHINK-HOMEWORK.png')} />
                <Text style={Css.errorText}>没有作业</Text>
            </View>
        );
    }
    
    
    render() {
        
        
        if(this.state.loading) {
           // return this.renderLoadingView();
        }
        
        
        
        return ( 
             <View style={styles.container}>
                 <View style={Css.navbar}>
                    
                    <Text style={Css.navbarText} numberOfLines={1}>
                      我的作业
                    </Text>
                    
                    <View style={[Css.alignRight,{flex:1}]}>
                        <GiftIcon press={this.pressGift}></GiftIcon>    
                    </View> 
                </View>
                
                <GiftedListView style={[Css.main]}
                  rowView={this._renderRowView}
                  onFetch={this._onFetch.bind(this)}
                  firstLoader={true} 
                  pagination={true} 
                  refreshable={true} 
                  withSections={false} 
                  customStyles={{            
                    paginationView: {
                      backgroundColor: '#000',
                      opacity:0,
                    },
                  }}
                  emptyView={this._renderEmptyView}
                  refreshableTintColor="#777"
                />
            </View>
        );
    }
    
    // 抽取彩蛋
    pressGift() {
        this.props.navChange({
          name: '抽取卡片',
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: 'http://h5.online.vanthink.cn/student#!/eggs',
            title: '抽取卡片'  
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }
}
module.exports = Homework;