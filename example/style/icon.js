import React, { Component } from 'react';

import { TouchableHighlight,View,Text, Image, StyleSheet, PropTypes } from 'react-native';



let styles = StyleSheet.create({
  icon: {
    width: 21,
    height: 21,
  },
  wrap:{
    flex:1,
    alignItems:'center',  
    justifyContent:'center',  
  },    
  blueIcon:{
    backgroundColor: '#3498db',
    borderRadius: 10.5,  
  },
  imageBtn:{
    flex:1,
    flexDirection: 'row',  
    justifyContent: 'center',
  }    
});

class Icons extends Component { 
    constructor(props) {
        super(props);

        console.log(this.props);

        this.press = this.press.bind(this);
      }

      press() {
        if(typeof this.props.press == 'function') {
            this.props.press();
        }else{
            // TODO
        }
        
      }
    
      _renderIcon() {
        return (
            <Image source={require('../images/Delete-48.png')} style={styles.icon} />
        );  
      }

      render() {
        return (
          <TouchableHighlight style={styles.wrap} underlayColor="transparent" onPress={this.press}>
            {this._renderIcon()}
          </TouchableHighlight>
        );
      }
    
}

class CloseIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Delete-48.png')} style={styles.icon} />
        );  
      }
}

class SearchIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Search-50.png')} style={styles.icon} />
        );  
      }
}
class FilterIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/filter.png')} style={styles.icon} />
        );  
      }
}

class CheckmarkIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/checkmark.png')} style={[styles.icon,styles.blueIcon]} />
        );  
      }
}

class CheckmarkIcon2 extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/checkmark.png')} style={[styles.icon]} />
        );  
      }
}

class BackIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Back-50.png')} style={[styles.icon]} />
        );  
      }
}

class BackIcon2 extends React.Component  {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.imageBtn}>
                <Image source={require('../images/Back-white-50.png')} style={[styles.icon,{marginRight:5,marginLeft:5,width:16}]} />
                <Text style={{fontSize:14,color:'#fff',marginTop:4}}>返回</Text>
            </View>
        );  
      }
}

class GiftIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/gift-48.png')} style={[styles.icon]} />
        );  
      }
}
class IdeaIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Idea-64.png')} style={[styles.icon]} />
        );  
      }
}
class UserIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Contacts-50.png')} style={[styles.icon,{width:16,height:16,opacity:.7}]} />
        );  
      }
}

class HomeIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/home.png')} style={[styles.icon,{width:16,height:16,opacity:.7}]} />
        );  
      }
}

class SmileIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/smile.png')} style={[styles.icon,{width:16,height:16,opacity:.7}]} />
        );  
      }
}

class TimeIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/time.png')} style={[styles.icon,{width:16,height:16,opacity:.7}]} />
        );  
      }
}

class ReportIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/report.png')} style={[styles.icon,{width:16,height:16,opacity:.7}]} />
        );  
      }
}

class CommemtIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/comemt.png')} style={[styles.icon,{width:16,height:16,opacity:.7}]} />
        );  
      }
}


module.exports = {
    CloseIcon,
    SearchIcon,
    FilterIcon,
    CheckmarkIcon,
    CheckmarkIcon2,
    BackIcon2,
    BackIcon,
    GiftIcon,
    IdeaIcon,
    UserIcon,
    HomeIcon,
    SmileIcon,
    TimeIcon,
    CommemtIcon,
    ReportIcon,
    
};
