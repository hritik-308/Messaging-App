import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import AllUsers from './allUsers';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import MsgComponent from '../components/Chat/MsgComponent';
import {COLORS} from '../components/constants/colors';
import {Center, Icon} from 'native-base';
import moment from 'moment';
import ChatHeader from '../components/Header/ChatHeader';
import SimpleToast from 'react-native-simple-toast';
import {lstmsg} from '../redux/reducer/user';

const Chat = (props, {navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const {receiverData} = props.route.params;
  const {lstms} = receiverData.lastMsg;
  const[loading,setLoading]=useState(false)

  const [msg, setMsg] = React.useState('');
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);

  useEffect(() => {
    
    const onChildAdd = firebase
      .database()
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', snapshot => {
        setallChat(state => [snapshot.val(), ...state]);
      });
    return () =>
      firebase
        .database()
        .ref('/messages' + receiverData.roomId)
        .off('child_added', onChildAdd);
  }, []);

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMsg = () => {
    if (msg == '' || msgvalid(msg) == 0) {
      SimpleToast.show('Enter something....');
      return false;
    }
    setdisabled(true);
    let msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'text',
      senderName:userData.Name
    };

    const newReference = firebase
      .database()
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      firebase
        .database()
        .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
        .update(chatListupdate);

      console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData);
      firebase
        .database()
        .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
        .update(chatListupdate);

      setMsg('');
      setdisabled(false);
    });
  };
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(!loading);
    },1000)
  },[])

  
  return (
    
    
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: -20}}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../Assets/leftarrow.png')} />
        </TouchableOpacity>
        <View style={{flexDirection: 'column', marginTop: -15}}>
          <Image
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#000',
              borderRadius: 50,
              marginLeft: 10,
            }}
            source={{
              uri: 'https://media.gettyimages.com/photos/tesla-ceo-elon-musk-speaks-during-the-unveiling-of-the-new-tesla-y-picture-id1130598318?s=2048x2048',
            }}
          />
          <Text style={{fontWeight: '800', fontSize: 20, marginTop: 5}}>
            {receiverData.Name}
          </Text>
        </View>
  
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <Image source={require('../../Assets/Vector.png')} />
        </TouchableOpacity>
      </View>
      <Image
        style={{marginTop: 20, marginLeft: 20}}
        source={require('../../Assets/Line.png')}
      />
      <View style={{flex: 1}}>
        
      
        <FlatList
          style={{flex: 1}}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <>
              <MsgComponent sender={item.from == userData.id} item={item} />
              </>
            );
          }}
        />
      
      </View>
  
      <View
        style={{
          backgroundColor: '#2994FF',
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 7,
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          style={{
            backgroundColor: COLORS.white,
            width: '80%',
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: COLORS.white,
            paddingHorizontal: 15,
            color: COLORS.black,
          }}
          placeholder="type a message"
          placeholderTextColor={COLORS.black}
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />
  
        <TouchableOpacity disabled={disabled} onPress={sendMsg}>
          <Image
            source={require('../../Assets/send.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      
      </View>
  
   
    </View>
  
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
