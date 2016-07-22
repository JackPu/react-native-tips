'use strict';
/* FACEBOOK hopes to use only one store for the whole app
*   But we only try this on our group we can view group as an single app
*/
import { createStore,bindActionCreators,combineReducers } from 'redux';
import * as reducers from '../reducers/group';

import * as types from '../actions/actionTypes';
var React = require('react-native');
var Css = require('../style/css');
var Button = require('react-native-button');
var LoadingSpinner = require('../components/loadingspinner');
var App = require('../service/core.app');
var Tab = require('../components/tab');
import { CloseIcon} from '../style/icon';

var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableHighlight,
    PropTypes,
    WebView,
    Modal,
    Component,
    Modal,
    Dimensions
} = React;
import { Provider } from 'react-redux';
let fullWidth = Dimensions.get('window').width; 
let styles = StyleSheet.create({
    row:{
        flex:1,
        width:fullWidth,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    rankRow:{
        flex:1,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: '#fff',
        borderBottomColor:'#eee',
        borderBottomWidth:1,  
        paddingLeft:10,
        flexDirection: 'row',
    },
    
    rankAvatar: {
        width:32,
        height:32,
        borderRadius:16,
        marginLeft:0,
    },
    
    username: {
        marginLeft: 10,
        lineHeight: 22,
    },
    number:{
        fontSize:18,
        alignSelf: 'flex-end',
        marginRight:10,
        color:'#000',
    },
    rankNum: {
        fontSize:12,
        textAlign:'center',
        backgroundColor:'#f1f1f1',
        
    },
    
    noRank:{
        backgroundColor: '#fff',
        height:200,
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        
    },
    noRankIcon:{
        width:100,
        height:100,
    }
    
});
const reducer = combineReducers(reducers);
var store = createStore(reducer);
console.log(store.getState());
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
let lastIndex = 0;
class Group extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this._renderRow = this._renderRow.bind(this);
        this._pressRow = this._pressRow.bind(this);
        this.state = {
            loading: true,
            idx: 0,
            data: {},
            list: false,
            modalVisible: false,
            modalTitle: '',
        };
        this._handeTabClick = this._handeTabClick.bind(this);
        this.clsoeModal = this.clsoeModal.bind(this);
        this.refresh();
 
    }
    
    
    refresh() {
        let self = this;
        App.send('/api2/common_class/rankList',{
            data:{
                group_no: 105,
            },
            success: function(res,isSuc) {
                if(isSuc) {
                    let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
                    self.setState({
                        loading: false,
                        data: res.data,
                        list: res.data.week_star_ranking_list,
                        listSource: ds.cloneWithRows(res.data.week_star_ranking_list),
                    });  
                }
            }
        })
    
    }

    _renderRow(rowData) {
        return (
          <TouchableHighlight
            style={styles.row}
            underlayColor='#c8c7cc'
            onPress={() => this._pressRow(rowData)}
           >
            <View style={styles.homeworkItem}>
                <View style={styles.homeworkCircle}>
                    <Image style={styles.avatar} source={{uri: rowData.game_icon}} />   
                </View> 
                <View style={styles.homeworkContents}>
                    <Text style={styles.homeworkName}>{rowData.testbank_name}</Text>    
                    <Text style={styles.gamename}>{rowData.game_name}</Text>  
                    <Status data={rowData} homeworkmode={this.state.data.hw_title.homeworkmode}></Status>
                </View>
            </View>       
          </TouchableHighlight>
       
        );    
    }
        
    _pressRow(rowData) {

        let url = App.generateGameUrl(rowData['game_url'],{
            hwid: this.props.data.no,
            testbank_no:rowData['testbank_no'],
            isPlay:true,
        });
        
        this.props.data.navChange({
          name: rowData['testbank_name'],
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: url,
            title: rowData['testbank_name']
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }

    _renderRankRow(rowData,rowID) {
        return (
            <View stye={styles.row}>
                <View style={styles.rankRow}>
                    <Image style={styles.rankAvatar} source={{uri: rowData.head_url}}/>
                    <Text style={styles.username}>{rowData.username}</Text>
                    <View style={{flex:1}}></View>
                    <Text style={styles.number}>{rowData.stars || rowData.integrals}</Text>
                    
                </View>
            </View>
        );
    }

    _renderRank() {
        if(this.state.list.length!=0) {
            return (
                <ListView dataSource={this.state.listSource} renderRow={this._renderRankRow}></ListView>
            );
        }
        return (
            <View style={styles.noRank}>
                <Image style={styles.noRankIcon} source={require('../images/ios_rank.png')} />
                <Text>暂无排行榜</Text>
            </View>
        );
        
    }
    
   clsoeModal() {
        
        this._handeTabClick(lastIndex)
   }
    
    _renderButton() {
         if(this.state.idx==0) { 
            return(
                <Button style={Css.btn} styleDisabled={{color: 'red'}} onPress={()=>this._handeTabClick(2)}>
            查看星星历史排行榜
        </Button>      
            );
        } else {
            return(
                <Button style={Css.btn} styleDisabled={{color: 'red'}} onPress={()=>this._handeTabClick(3)}>
            查看积分历史排行榜
        </Button>     
            );
        }
    }
        
    render() {
        if(this.state.loading) {
            return (
                <LoadingSpinner></LoadingSpinner> 
            );
        }
        return ( 
            
            <View>
            <Modal
              animationType="slide" 
              visible={this.state.modalVisible}
              onRequestClose={() => {this._setModalVisible(false)}}
              >
              <View style={[Css.modalContainer]}>
                <View style={[Css.navbar]}>
                    <View style={Css.alignLeft}>
                        <CloseIcon press={this.clsoeModal}></CloseIcon>
                    </View>
                    <Text style={Css.navbarText} numberOfLines={1}>
                        {this.state.modalTitle}
                    </Text>
                    <View style={Css.corner}></View>
                </View>
                <View style={Css.main}>
                    {this._renderRank()}
                </View>
              </View>
            </Modal>
                 <View style={Css.navbar}>
                     <Text style={Css.navbarText} numberOfLines={1}>
                      班级
                    </Text>  
                </View>
                <View style={Css.main}>
                    <Tab tabClick={(idx)=> this._handeTabClick(idx)} idx={this.state.idx} tabstr={"星星排行,积分排行"}></Tab>
                </View>
                <View style={Css.spaceWrap}></View>
                {this._renderRank()}
                <View style={Css.btnWrap}>
                    {this._renderButton()}
                </View>
            </View>
            
        );
    }
        
    // bind events
    _handeTabClick(idx) {
        let data = [];
        
        switch(idx) {
            case 1: {
                data = this.state.data.week_score_ranking_list;
                break;
            }
            case 2: { 
                data = this.state.data.history_star_ranking_list; 
                break;
            }
            case 3: {
                
                data = this.state.data.history_score_ranking_list; 
                break;
            }
            default: data = this.state.data.week_star_ranking_list;
        }
        
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
        lastIndex = this.state.idx;
        this.setState({
            idx:idx,
            listSource: ds.cloneWithRows(data),
            list: data,
            modalVisible: (idx==2||idx==3),
            modalTitle: ['星星历史排行榜','积分历史排行榜'][idx-2]
        });
        
    }
        
    _handlePress() {
            
    }
}

module.exports = Group;