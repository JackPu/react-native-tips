import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
    tabContaner:{
        flex:1,
        height:45,
        flexDirection: 'row',
        backgroundColor: '#fff',
        shadowColor: 'rgba(0,0,0,.25)',
        shadowRadius: 2,
        shadowOffset: {width:1, height:0}
    },
    tab: {
        flex:1,
        justifyContent: 'center', 
    },
    tabActive: {
        borderBottomWidth:2,
        borderBottomColor: '#3c9cdd',
            
    },
    tabText: {
        textAlign: 'center',
    }
    
});



 class Tab extends React.Component {

  constructor(props) {
      super(props);
      this._handlePress = this._handlePress.bind(this);
      this.state = {
        tabs: this.props.tabstr.split(','),
      };
      
  }
     
  _handlePress(idx) {
    this.props.tabClick(idx)
  }
     
  render() {
    
      var tabView = [];
      this.state.tabs.forEach((item,idx) => { 
            let cssArr = [styles.tab];
            if(idx==this.props.idx) {
                cssArr.push(styles.tabActive);
            }
            tabView.push(
                <TouchableHighlight underlayColor={"#f4f4f4"} key={idx} style={cssArr} onPress={()=>this._handlePress(idx)}>
                    <Text style={styles.tabText}>{item}</Text>
                </TouchableHighlight>
            );
        })
      
      return (
        <View style={styles.tabContaner}>
            
           {tabView}
          
        </View>
    );    

  }

};

module.exports = Tab;