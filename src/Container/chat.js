import {View, Text, Image, TouchableOpacity,SafeAreaView} from 'react-native';
import React,{ useState, useCallback, useEffect} from 'react';
import AllUsers from './allUsers';
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux';


const Chat = (props, {navigation}) => {

  const {userData} = useSelector(state => state.User)

  console.log('weee==============>',props.route.params.receiverData.id);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id:1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: userData.id,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <>
    <SafeAreaView>
    <View
      style={{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 30,
        alignItems: 'center',
      }}>
      <TouchableOpacity  style={{marginLeft:-20}} onPress={() => props.navigation.goBack()}>
        <Image
         
          source={require('../../Assets/leftarrow.png')}
        />
      </TouchableOpacity>

      <Text style={{fontWeight: '800', fontSize: 20}}>
        {props.route.params.Username}
      </Text>

      <TouchableOpacity onPress={() => alert('hello')}>
        <Image
          
          source={require('../../Assets/Vector.png')}
        />
      </TouchableOpacity>
    </View> 
    
    
         </SafeAreaView>
        <GiftedChat
        messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
         </>
    );
  };
    

export default Chat;
