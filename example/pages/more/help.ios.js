'use strict';
// use html page http://online.beta.vanthink.cn/user/#/register

var React = require('react-native');
var Button = require('react-native-button');
var {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    WebView,
    Component
} = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1,
    },
    header:{
        marginTop:22,
        height:44,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        alignItems:'center',
        justifyContent:'center',
    },
    
    headerText:{
        fontSize:24,
    },
    webview:{
        flex:1,
    }



});
var WebViewExample = React.createClass({
  getInitialState: function() {
    return {
      url: DEFAULT_URL,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
    };
  },
  inputText: '',
  handleTextInputChange: function(event) {
    this.inputText = event.nativeEvent.text;
  },
  render: function() {
    this.inputText = this.state.url;
    return (
      <View style={[styles.container]}>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity onPress={this.goBack}>
            <View style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
              <Text>
                 {'<'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goForward}>
            <View style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
              <Text>
                {'>'}
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            value={this.state.url}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                 Go!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={this.state.url}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
      </View>
    );
  },
  goBack: function() {
    this.refs[WEBVIEW_REF].goBack();
  },
  goForward: function() {
    this.refs[WEBVIEW_REF].goForward();
  },
  reload: function() {
    this.refs[WEBVIEW_REF].reload();
  },
  onNavigationStateChange: function(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
    });
  },
  onSubmitEditing: function(event) {
    this.pressGoButton();
  },
  pressGoButton: function() {
    var url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyoard
    this.refs[TEXT_INPUT_REF].blur();
  },
});
var WEBVIEW_REF =  'webview';

var DEFAUTL_URL = 'http://online.beta.vanthink.cn/user/#/register';

class Help extends Component {
    
    
    onNavigationStateChange() {
        return {};
    }
    
    
    render() {
        return ( 
            <View style ={styles.container}>
               <View style={styles.header}>
                    <Text style={styles.headerText}>注册</Text>
               </View>
            <View style={styles.webview}>
                 <WebView
                      ref={WEBVIEW_REF}
                      automaticallyAdjustContentInsets={false}
                      style={styles.webView}
                      url={DEFAUTL_URL}
                      onNavigationStateChange={this.onNavigationStateChange}
                      startInLoadingState={true}
                    />
            </View>
              
            </View>
        );
    }
}

module.exports = Help;