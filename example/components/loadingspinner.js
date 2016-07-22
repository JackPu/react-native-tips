import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
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
});



 class Spinner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.loading} source={require('../images/712.gif')} />
            <Text>加载中...</Text>
        </View>
    );    

  }

};

module.exports = Spinner;