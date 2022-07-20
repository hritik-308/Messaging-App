import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import { firebase } from '@react-native-firebase/database'

const LastMessage = () => {


    useEffect(() => {
       Lstmsg()
      }, []);
    

    const Lstmsg=()=>{
        firebase.database().ref("/ChatList/")
        .then(snapshot =>{
             console.log('User data: ', Object.values(snapshot.val()))})
    }
  return (
    <View>
      <Text>LastMessage</Text>
    </View>
  )
}

export default LastMessage