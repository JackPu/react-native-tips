'use strict';

var React = require('react-native');
var App = require('../service/core.app');

var Css = require('../style/css')
var homeworkDetail = require('./homework/detail');
import {FilterIcon,CloseIcon,CheckmarkIcon,CheckmarkIcon2} from '../style/icon';
var {
    StyleSheet,
    View,
    Text,
    Image,
    Component,
    TouchableHighlight,
    ListView,
    Modal,
    Dimensions,   
} = React;

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

class Teacher extends Component {
    
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this._renderRowView = this._renderRowView.bind(this);
        this.openModal = this.openModal.bind(this);
        this.clsoeModal = this.clsoeModal.bind(this);
        this._renderTeacherRow = this._renderTeacherRow.bind(this);
        this._onPressTeacher = this._onPressTeacher.bind(this);
        this.selectTeacher = this.selectTeacher.bind(this);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            list: false,
            teacherList:ds.cloneWithRows([]),
            loading: true,
            pageno: 1,
            currentTeacher: {
                username: '加载中...',
                head_url: 'http://img1.vued.vanthink.cn/headurl20160401164446863.jpg',
            },
            modalVisible: false,
        }
        this.refreshTeacher();
        this._onFetch(1,()=>{});
   
    }
    
    refreshTeacher() {
        let self = this;
        App.send('/api2/student_teacher/list',{
            success: function(result,isSuccess) {
                if(isSuccess) {
                    
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    self.setState({
                        teacherList: ds.cloneWithRows(result.data),
                        currentTeacher: result.data.length>0  && result.data[0]
                    });
                    
                    
                }
                
            }
        });    
    
    }
    
    refresh(callback,options) {
        let self = this;
        this.setState({
            loading: true
        });
        let url = '/api2/student_homework/one';
        if(options && options.teacher_no) {
            url = '/api2/student_homework/all';
        }
        let teacherNo = options !== undefined ? options.teacher_no : 0;
        App.send(url,{
            data:{
                teacher_no: teacherNo ,
            },
            success: function(result,isSuccess) {
                if(isSuccess) {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    if(result.data.count==0) {
                        return self.setState({
                            list: ds.cloneWithRows(result.data.list),
                            max: result.data.count,
                            loading: false
                        });
                    }
                    self.setState({
                        list: ds.cloneWithRows(result.data.list),
                        max: result.data.count,
                        loading: false
                    });
                   
                }else{
                    self.setState({
                        list: [],
                        max: 0,
                        loading: false
                    }); 
                }
                callback(result.data.list);
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
        this.refresh(callback,options); 
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

    _onPressTeacher(rowData) {
        this.setState({
            currentTeacher: rowData,
            modalVisible: false,
        });
        console.log(rowData['userid']);
        this._onFetch(1,()=>{},{
            teacher_no: rowData['userid']
        });
        
    }

    _renderTeacherRow(rowData) {
        let checkmark = [];
        if(this.state.currentTeacher['userid']== rowData['userid']) {
            checkmark.push(<CheckmarkIcon></CheckmarkIcon>);
        }
        return(
             <TouchableHighlight
                style={styles.row}
                underlayColor='#c8c7cc'
                onPress={() => this._onPressTeacher(rowData)}
               >
                <View style={styles.rankRow}>
                    <Image style={styles.rankAvatar} source={{uri: rowData.head_url}}/>
                    <Text style={styles.username}>{rowData.username}</Text>
                    <View style={{flex:1}}></View>
                    {checkmark}
                    
                </View>
            </TouchableHighlight>
        );
    }
    

    renderModal() {
        this.oldTeacher = this.state.currentTeacher;
        return (
            <Modal
              animationType="slide" 
              visible={this.state.modalVisible}
              onRequestClose={() => {this._setModalVisible(false)}}
              >
              <View style={[Css.modalContainer]}>
                <View style={[Css.navbar]}>
                     <View  style={Css.alignLeft}>
                        <CloseIcon press={this.clsoeModal}></CloseIcon> 
                    </View>
                    <Text style={Css.navbarText} numberOfLines={1}>
                        选择老师
                    </Text>
                    <View style={Css.corner}></View>
                </View>
                <View style={Css.main}>
                   <ListView dataSource={this.state.teacherList} renderRow={this._renderTeacherRow}></ListView>
                </View>
              </View>
            </Modal>
        );
    
    }
    
     _renderEmptyView() {
        return (
            <View style={[Css.main,Css.errorView]}>
                <Image style={Css.errorIcon} source={require('../images/ICON-VANTHINK-HOMEWORK.png')} />
                <Text style={Css.errorText}>{this.state.currentTeacher.username} 老师暂时没有布置作业</Text>
            </View>
        );
    }
    
   
    
    render() {
        
        
        if(this.state.loading) {
            return this.renderLoadingView();
        }
        let listview = [];
        if(this.state.max == 0) {
            listview.push(this._renderEmptyView());
        }else{
            listview.push( <ListView style={[Css.main]}
                  renderRow={this._renderRowView}
                  dataSource={this.state.list}>
                </ListView>);
        }
        
        return ( 
             <View style={styles.container}>
                {this.renderModal()}
            
                <View style={Css.navbar}>
                    <Image style={[Css.navbarAvatar,Css.alignLeft]} source={{uri: this.state.currentTeacher['head_url']}} />
                    <Text style={Css.navbarText} numberOfLines={1}>
                        {this.state.currentTeacher.username}
                    </Text> 
                    <View style={Css.corner}></View>
                    <View style={Css.alignRight}>
                        <FilterIcon press={this.openModal}></FilterIcon>
                    </View>
                </View>
                {listview}
            </View>
        );
    }
    
     openModal() {
        this.setState({
            modalVisible: true
        });
    }

    clsoeModal() {
        this.setState({
            modalVisible: false,
            currentTeacher: this.oldTeacher
        });
    }

    selectTeacher() {
       
    }
}
module.exports = Teacher;