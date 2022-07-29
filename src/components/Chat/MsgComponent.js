// import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable ,Image} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS } from '../constants/Font';
import TimeDelivery from './TimeDelivery';

const MsgComponent = (props) => {
    const { sender, item, sendTime } = props;


    // console.log('props',props)
    // console.log("item",item.Images)
    

    return (
        <Pressable
            style={{ marginVertical: 0 }}
        >
            
            <View
                style={[styles.TriangleShapeCSS,
                sender ?
                    styles.right
                    :
                    [styles.left]
                ]}
            />
            <View
                style={[styles.masBox, {
                    alignSelf: sender ? 'flex-end' : 'flex-start',
                    // borderWidth:1,
                    marginBottom:-2
                  
                }]}
            >
                
                    { !sender ?
                    <Text style={{ paddingLeft: 5, color:  sender ? "#707070" : "#707070",fontFamily:FONTS.Regular,fontSize:12.5 }}>{item.senderName}</Text>
                    :

                    <Text style={{ paddingLeft: 5, color:  sender ? "#707070" : "#707070",fontFamily:FONTS.Regular,fontSize:12.5 }}>{null}</Text>
                
                    }
            </View>

            <View
                style={[styles.masBox, {
                    alignSelf: sender ? 'flex-end' : 'flex-start',
                    // borderWidth:1,
                    backgroundColor: sender ? '#2994FF' : "#707070"
                }]}
            >
                
                { item.Images===undefined ||item.Images===null||item.Images.length===0  ?  
                <Text style={{ paddingLeft: 5, color:  sender ? COLORS.black : COLORS.white,fontFamily:FONTS.Regular,fontSize:14,marginTop:4 }}>
                    {item.message}
                </Text>  
                  : (item.Images.map(it=>{
                    return(
                        <Image style={{height:200,width:200,zIndex:99}} source={{uri:it.path}}/> 
                    )
                  }))
                  

} 
                <View style={{flexDirection:'row'}}>
                <TimeDelivery
                    sender={sender}
                    item={item}
                />
                {/* <Text>✓✓</Text> */}
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    masBox: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        minWidth: 80,
        maxWidth: '80%',
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingTop: 5,                                      
        borderRadius: 8
    },
    timeText: {
        fontFamily: 'AveriaSerifLibre-Light',
        fontSize: 10
    },
    dayview: {
        alignSelf: 'center',
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: COLORS.white,
        borderRadius: 30,
        marginTop: 10
    },
    iconView: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.themecolor,
    },
    TriangleShapeCSS: {
        position: 'absolute',
        // top: -3,
        width: 0,
        height: 0,
        // borderBottomLeftRadius:5,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 5,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        // borderBottomColor: '#757474'
    },
    left: {
        borderBottomColor: COLORS.white,
        left: 2,
        bottom: 10,
        transform: [{ rotate: '0deg' }]
    },
    right: {
        borderBottomColor: '#2994FF',
        right: 2,
        // top:0,
        bottom: 5,
        transform: [{ rotate: '103deg' }]
    },
});

export default MsgComponent;