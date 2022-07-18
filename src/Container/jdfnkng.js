import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
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
import { lstmsg } from '../redux/reducer/user';

const GrpMessages = (props, {navigation}) => {


  console.log(props.route.params);

  const dispatch=useDispatch();


  const {userData} = useSelector(state => state.User);
// const {lstms}=receiverData.lastMsg
  console.log('weee==============>', userData);
  // const [messages, setMessages] = useState([]);
  const [msg, setMsg] = React.useState('');
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    const onChildAdd = firebase
      .database()
      .ref('/messages/' + props.route.params.RoomId)
      .on('child_added', snapshot => {
        // console.log('A new node has been added', snapshot.val());
        setallChat(state => [snapshot.val(), ...state]);
      });
    // Stop listening for updates when no longer required
    return () =>
      firebase
        .database()
        .ref('/messages' + props.route.params.RoomId)
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
      roomId:props.route.params.RoomId,
      message: msg,
      from: userData?.Name,
      sendTime: moment().format(''),
      msgType: 'text',
    };

    const newReference = firebase
      .database()
      .ref('/messages/' + props.route.params.RoomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      firebase
        .database()
        .ref('/chatlist/' + props.route.params?.gId + '/' + userData?.id)
        .update(chatListupdate)
        // .then(() => console.log('Data updated.'))
        // .then(()=>dispatch(lstmsg(receiverData.lastMsg)))
      // console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData);
      firebase
        .database()
        .ref('/chatlist/' + userData?.id + '/' + props.route.params?.gId)
        .update(chatListupdate)
        // .then(() => console.log('Data updated.'))
        // .then(()=>dispatch(lstmsg(receiverData.lastMsg)))

      setMsg('');
      setdisabled(false);
    });
  };

  return (
    <View style={styles.container}>
      {/* <ChatHeader data={receiverData} /> */}
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
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dh9ayOD6Z3q8Beu01vHFIU07lOzegKMTFjCrxDipAg&s',
            }}
          />
          <Text style={{fontWeight: '800', fontSize: 20, marginTop: 5}}>
            {/* {GroupUsers.groupName} */}
            hiii
          </Text>
        </View>

        <TouchableOpacity onPress={()=>props.navigation.navigate('Profile') }>
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
              <MsgComponent sender={item.from == userData.id} item={item} />
            );
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#2994FF',
          elevation: 5,
          // height: 60,
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
          {/* <Icon
            style={{
              // marginHorizontal: 15,
              color: COLORS.black,
            }}
            name="paper-plane-sharp"
            type="Ionicons"
          /> */}
          <Image
            source={require('../../Assets/send.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default GrpMessages;