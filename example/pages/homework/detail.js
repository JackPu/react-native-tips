'use strict';

var React = require('react-native');
var Css = require('../../style/css');
var LoadingSpinner = require('../../components/loadingspinner');
var Status = require('./status');
var Web = require('../web');
var App = require('../../service/core.app');
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
    Dimensions
} = React;
let fullWidth = Dimensions.get('window').width; 
let styles = StyleSheet.create({
    wrap: {
        paddingLeft:10,
        paddingRight: 10,
    },
    titleWrap:{
        paddingTop: 25,
        paddingBottom: 10,
    },
    homeworkTitle: {
        fontSize: 18,
    },
    
    teacherName: {
        fontSize: 15,
        color: '#555',
        lineHeight: 25,
    },
    date:{
        fontSize: 13,
        color: '#999',
        lineHeight: 25,
    },
    homeworkmode:{
        width:90,
        height:24,
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        paddingLeft:5,
        paddingRight:5,
        backgroundColor: '#3498db',
        borderRadius:12,
        justifyContent: 'center',
        
    },
    homeworkmodeText:{
        
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
    
    },
    row:{
        flex:1,
        width:fullWidth,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    homeworkItem: {
        position:'relative',
        height: 90,
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
    
    gamename:{
        fontSize:14,
        color:'#555',
    },
    finishTextView: {
        paddingBottom:10,
        paddingLeft:10,
    },
    finishStudentText:{
        lineHeight:45,
        fontSize:13,
        color: '#888'
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



class Detail extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this._renderRow = this._renderRow.bind(this);
        this._pressRow = this._pressRow.bind(this);
        this.state = {
            loading: true,
            data: {},
            list: false,
            rankList: false
        };
        
        this.refresh();
 
    }
    
    renderLoadingView() {
        return (
            <View style={Css.loadingContainer}>
                <Image style={Css.loading} source={require('../../images/712.gif')} />
            </View>
        );
    }
    
    refresh(no) {
        let self = this;
        App.send('/api/homework_detail/index?homework_no=' + this.props.data.no,{
            success: function(res,isSuc) {
                if(isSuc) {
                    let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
                    self.setState({
                        loading: false,
                        data: res.data,
                        list: ds.cloneWithRows(res.data.hw_content),
                        rankList: ds.cloneWithRows(res.data.hw_completion)
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

    renderMode() {
        if(this.state.data.hw_title.homeworkmode==1){
            return (
                 <Text style={styles.homeworkmodeText}>达标模式</Text>
            );
        }
        
        return (
             <Text style={styles.homeworkmodeText}>自由模式</Text>
        );    
    }

    _renderRankRow(rowData) {
        return (
            <View stye={styles.row}>
                <View style={styles.rankRow}>
                    <Image style={styles.rankAvatar} source={{uri: rowData.head_url}}/>
                    <Text style={styles.username}>{rowData.username}</Text>
                </View>
            </View>
        );
    }

    _renderRank() {
        if(this.state.data.hw_completion.length!=0) {
            return (
                <ListView dataSource={this.state.rankList} renderRow={this._renderRankRow}></ListView>
            );
        }
        return (
            <View style={styles.noRank}>
                <Image style={styles.noRankIcon} source={require('../../images/ios_rank.png')} />
                <Text>暂无其他学生完成作业</Text>
            </View>
        );
        
    }
        
    render() {
        if(this.state.loading) {
            return (
                <LoadingSpinner></LoadingSpinner> 
            );
        }
        return ( 
            <View style={Css.container}>
                <View style={[styles.wrap,styles.titleWrap]}>
                    <Text style={styles.homeworkTitle}> {this.props.data.name}</Text>
               </View>
                <View style={styles.wrap}>
                    <Text style={styles.teacherName}>老师: {this.props.data.teacher}</Text>
               </View>
                <View style={styles.wrap}>
                    <Text style={styles.date}>
                        {this.state.data.hw_title.arrangementtime} - {this.state.data.hw_title.expirydate}
                    </Text>
               </View>
               <View style={styles.homeworkmode}>         
                  {this.renderMode()}
                </View>
               <ListView dataSource={this.state.list} renderRow={this._renderRow}></ListView>
               <View style={styles.finishTextView}>
                   <Text style={styles.finishStudentText}>已完成学生</Text>
                </View>
               {this._renderRank()}
            </View>
        );
    }
}

module.exports = Detail;