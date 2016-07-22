'use strict';

import React,{Component} from 'react';
var Css = require('../style/css');
var App = require('../service/core.app');
import {
    CloseIcon,
    SearchIcon,
    FilterIcon,
    CheckmarkIcon,
    BackIcon2,
    GiftIcon
} from '../style/icon';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    PropTypes,
    Dimensions
}from 'react-native';

var styles = StyleSheet.create({
    article:{
        padding:15,
        backgroundColor:'#fff',
    },
    title:{
        flex:1,
        width:200,
        fontSize: 22,
        
    },
    poster:{
        height:Dimensions.get('window').width,
        marginTop:10,
        
    },
    details:{
        marginTop:20,
        lineHeight:25,
    }

});

class LongText extends Component {
    constructor(props) {
        super(props);
        let url = '';
        if(props.data.url) {
            url = props.data.url;
        }
        this.state = {
          url: url,
        };

    }
    render() {

        return ( 
            <View style ={Css.container}>

                
                <Text style={Css.listLable} >使用 numberOfLines</Text>
                <ScrollView style={styles.article}>
                    <Text style={styles.title} numberOfLines={1}>少林足球- Shaolin Soccer</Text>        
            <Image style={styles.poster} source={{uri:'http://img1.vued.vanthink.cn/vuedd4f383353248019306d41c487c5d56f5.jpeg'}}/>
            
                    <Text style={styles.details} numberOfLines={4}>
                        最近问周星驰电影的前五名，哈哈其实我心中大致如下（真的很难排位啦）：

5.《长江七号》，星爷非常用心拍给大孩子和小孩子的电影，很感人。当您哪天为人父母，陪着孩子再看一次，或许您会有不一样的体会；

4.《少林足球》,足球与功夫完美结合，创意无限。热血青春～

3.《回魂夜》恐怖片中最好的喜剧片，喜剧片中最好的恐怖片，非常值得看的电影。很刺激～

2.《喜剧之王》一步值得回味的电影，多年前以为是喜剧片，后面才知道是部如此感人的言情剧。

1.《功夫》星爷最成功的商业片，气势磅礴，配乐，武大，情怀，台词，摄影，特效始终无敌的存在。
                    </Text>
                </ScrollView>
                
            </View>
        );
    }
}

module.exports = LongText;