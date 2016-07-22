'use strict';

var React = require('react-native');
var Css = require('../style/css');




var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    PropTypes,
    WebView,
    Component
} = React;


var api = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
class Web extends Component {
    constructor(props) {
        super(props);
        this.state = {
          url: 'http://h5.online.vanthink.cn/index/feedback'
        };
    }
        
    render() {

        return ( 
            <View style ={Css.container}>
                <WebView
                  ref={'webview'}
                  automaticallyAdjustContentInsets={false}
                  style={{flex:1}}
                  source={{uri:this.state.url}}
                  startInLoadingState={true}
                />
                
              
            </View>
        );
    }
}

module.exports = Web;