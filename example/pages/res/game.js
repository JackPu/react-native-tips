'use strict';

var React = require('react-native');
var Css = require('../../style/css');
var LoadingSpinner = require('../../components/loadingspinner');
var App = require('../../service/core.app');
var Web = require('../web');
var Tab = require('../../components/tab');

var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableHighlight,
    ScrollView,
    Component,
    Dimensions
    
    
} = React;

var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    width: (Dimensions.get('window').width - 30) / 3,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumb: {
    width: 55,
    height: 55
  },
  text: {
    flex: 1,
    marginTop: 10,
  }


});

class Game extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this._renderRow = this._renderRow.bind(this);
        this._pressRow = this._pressRow.bind(this);
        this.state = {
          idx:0,
          list:ds.cloneWithRows([]),
          visible: true,    
        };
        
        this.refresh();
    }
    
    refresh() {
        let self = this;
        App.send('/api2/common_game/list',{
            
            success: function(res,isSuccess) {
                if(isSuccess) {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    self.setState({
                        list: ds.cloneWithRows(res.data.list),
                        visible: false,
                    })
                    
                }   
            }    
        })
    }
        
    _genRowdata(list) {
        
    }
     
    _renderRow(rowData,sectionID, rowID) {
        
        return (
          <TouchableHighlight onPress={() => this._pressRow(rowID,rowData)} underlayColor='rgba(0,0,0,0)'>
            <View>
              <View style={styles.row}>
                <Image style={styles.thumb} source={{uri: rowData['game_icon']}} />
                <Text numberOfLines={1} style={styles.text}>
                  {rowData['game_name']}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        );
    }
    
    render() {
        return ( 
            <View style ={styles.container}>
               <View style={Css.navbar}>
                 <Text style={Css.navbarText} numberOfLines={1}>
                  我的活动
                </Text>  
                </View>
                <View style={Css.main}>
                     <Tab tabClick={(idx) => this._handleType(idx)} idx={this.state.idx} tabstr="全部,单词,句子,阅读"></Tab>
                    <View style={Css.gmt10}></View>
                    <ScrollView style={[Css.main,{backgroundColor:'#fff'}]}>
                        <ListView contentContainerStyle={styles.list}
                            dataSource={this.state.list}
                            renderRow={this._renderRow}
                          />
                        <View style={Css.bottomSpace}></View>
                    </ScrollView>    
            
                </View>
               
            </View>
        );
    }
    
    _handleType(idx) {
        this.setState({
            idx: idx
        });    
    }
    
    _pressRow(rowID,rowData) {
        console.log(rowID);
        
        this.props.navChange({
          name: "反馈",
          component: Web,
          headerStyle:{
            borderBottomWidth:1,
            borderBottomColor: '#ddd',
            backgroundColor: '#2980b9',  
          },
          data:{
            url: rowData['game_url'],
            title: rowData['game_name']  
          },    
          titleStyle:{
            color: '#333333',
          }
               
        });
    }
}

module.exports = Game;