//import liraries
import { Icon } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import moment from 'moment';
import { COLORS } from '../constants/colors';
import { FONTS } from '../constants/Font';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';


// create a component
const ChatHeader = (props,{navigation}) => {
    const { data } = props;
    // console.log("cht saa",data);

    const [lastSeen, setlastSeen] = useState('')

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={'#2994FF'} translucent={false} />
            <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.black,
                }}
                name = "chevron-back"
                type = "Ionicons"
                onPress = {() => props.navigation.goback()}
            />
            <Avatar
               source = {{uri: data.img}} 
               rounded
               size="small"
            /> 

            <View 
                style={{flex:1, marginLeft: 10}}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: COLORS.white,
                        fontSize: 16,
                        fontFamily: FONTS.SemiBold,
                        textTransform:'capitalize'
                    }}
                >
                    {data.name}
                </Text>

                <Text
                    style={{ color: COLORS.primaryBackground, fontSize: 10,fontFamily: FONTS.Regular }}
                >
                    {lastSeen}
                </Text>
            </View>

            <Icon
                style={{
                    marginHorizontal: 10,
                    color:'#2994FF'
                }}
                name="videocam-outline"
                type="Ionicons"
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height:70,
        backgroundColor: '#2994FF',
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
});

//make this component available to the app
export default ChatHeader;