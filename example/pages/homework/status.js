import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
   status:{
     color: '#777',
     lineHeight:20,
   },
    status_green:{
      color: '#2ecc71',
    },
    status_red:{
      color: '#e74c3c',   
    }
});



 class Status extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let homeworkmode = this.props.homeworkmode;  
 

    if(data['correct_right']>=60) {
        return (
            <Text style={styles.status}>已完成</Text>
        );
    }
    if(data['correct_right']<60&&data['correct_right']>=0&&homeworkmode== 1) {
        return (
            <Text style={[styles.status,styles.status_green]}>已完成</Text>
        );
    }
    if(data['correct_right']<60&&data['correct_right']>=0&&homeworkmode != 1) {
        return (
            <Text style={[styles.status,styles.status_red]}>&lt;60%</Text>
        );
    }
    return (
        <Text style={styles.status}>已完成</Text>
    );
        

  }

};

module.exports = Status;