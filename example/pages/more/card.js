var React = require('react-native');

var Css = require('../../style/css');

var App = require('../../service/core.app');
var LoadingSpinner = require('../../components/loadingspinner');
var {
    StyleSheet,
    Component,
    View,
    Text,
    ListView,
    Image,
    Dimensions,
    ScrollView
    
} = React;
var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    position: 'relative',  
    justifyContent: 'center',
    padding: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    position:'absolute',
    bottom:2,
    right:2,  
    fontSize:12,  
  }


});
class Card  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: false,
            loading: true,
            source:{
                name:'卡片...'
            }
        };
        this.renderRow = this.renderRow.bind(this);
        this.refersh();
    }
    
    refersh() {
        let self = this;
        App.send('/api/Eggs_Puzzle/getUserPuzzleDetail',{
            data:{
                pid: 54,
            },
            success: function(res,isSuc) {
                if(isSuc) {
                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    
                    self.setState({
                        loading: false,
                        cardList: ds.cloneWithRows(res.data.myCards),
                        source: res.data.source,
                        cardW: self.calcWidthAndHeight(res.data.source.x,res.data.source.y,res.data.source.w,res.data.source.h)['w'],
                        cardH: self.calcWidthAndHeight(res.data.source.x,res.data.source.y,res.data.source.w,res.data.source.h)['h']
                    });
                }
            }
        });
    }
    
    calcWidthAndHeight(x,y,W,H) {
        let w = Dimensions.get('window').width;
        
        return {
            w: w/x,
            h: H/y * w/W
        };
    }
    
    
    renderRow(rowData) {
        return (
            <View>
              <View style={[styles.row,{width:this.state.cardW,height:this.state.cardH}]}>
                <Image style={{width:this.state.cardW-2,height:this.state.cardH-1}} source={{uri: rowData['src']}} />
              </View>
            </View>
        );
    }
    
    _rednerData() {
        if(this.state.loading) {
            return (
                <LoadingSpinner></LoadingSpinner>
            );    
        }
        
        return (
             <View style={[{backgroundColor:'#fff',paddingTop:5}]}>
                        <ListView contentContainerStyle={styles.list}
                            dataSource={this.state.cardList}
                            renderRow={this.renderRow}
                          />
                    </View>   
        );
    }
    
    render() {
        return (
            <View style={Css.container}>
                <Text style={Css.listLable}>卡片:{this.state.source['name']}</Text>
                {this._rednerData()}
            </View>
           
        );
    }
    
}

module.exports = Card;