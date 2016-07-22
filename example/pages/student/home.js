'use strict';

var React = require('react-native');
var Css = require('../../style/css');


var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    Component
} = React;

var styles = StyleSheet.create({
    
    container: {
        alignSelf: 'stretch',
        justifyContent: 'center',
       
        backgroundColor: '#f1f1f1',
    },
    
    hd:{
        flex:1,
        marginTop:20,
        height:44,
        backgroundColor:'#3498db',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        
    },
    
    hdText:{
        flex: 1,
        textAlign:'center',
        fontSize:16,
        color: '#ffffff',
        
    },
    
    rightMenu:{
        width:44,
        fontSize:16,
        alignItems: 'center',
        textAlign:'center',
    },
    
    leftMenu:{
        width:44,
        fontSize:16,
        alignItems: 'center',
        textAlign:'center',
        
    },



})

var api = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          loaded: false,
        };
    }
    
    fetchData() {
        fetch(api)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }
    
    componentDidMount() {
        this.fetchData();
    }
    
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <View style={Css.gLoading}></View>    
            </View>
        );
    }

    renderTeacherList(movie) {
        return (
          <View style={styles.container}>
            <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
          </View>
        );
    }
    
    render() {
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }
        return ( 
            <View style ={styles.container}>
                <View style ={styles.container}>
               <View style={Css.navbar}>
                 <Text style={Css.navbarText} numberOfLines={1}>
                  我的学生
                </Text>  
                </View>
            </View>
                
            </View>
        );
    }
}

module.exports = Student;