import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  LogBox,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, ScrollView} from 'native-base';
import moment from 'moment';
import {removeUser} from '../redux/reducer/user';

const ChatList = ({navigation}) => {
  const {userData} = useSelector(state => state.User);
  const dispatch = useDispatch();

  const [chatList, setchatList] = useState([]);
  const [search, setSearch] = useState('');
  const [lstMsg, setLstMsg] = useState('');
  const [Date, setDate] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // getAllGroups();
  }, []);

  useEffect(() => {
    getChatlist();
    // getLstMsg();
  }, []);

  const getChatlist = async () => {
    firebase
      .database()
      .ref('/chatlist/' + userData?.id)
      .on('value', snapshot => {
        // console.log('User data: ', (Object.values(snapshot.val())));
        if (snapshot.val() != null) {
          setchatList(Object.values(snapshot.val()));
        } else {
          return alert('chatlist is empty');
        }
        // setRoomId(Object.values(snapshot.val()).map(items=>(items.id)))
      });
  };

  const SearchBtn = chatList.filter(val => {
    if (search == '') {
      return val;
    } else if (val.Name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  });

  const createChatList = data => {
    firebase
      .database()
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: userData.id,
            Name: userData.Name,
            phoneNumber: userData.phoneNumber,
            img: userData.img,
            about: userData.about,
            lastMsg: '',
          };
          firebase
            .database()
            .ref('/chatlist/' + data.id + '/' + userData.id)
            .update(myData);
          // .then(() => console.log('Data updated.'));

          // delete data['password'];
          data.lastMsg = '';
          data.roomId = roomId;
          firebase
            .database()
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .update(data);
          // .then(() => console.log('Data updated.'));

          navigation.navigate('Chat', {receiverData: data});
        } else {
          navigation.navigate('Chat', {receiverData: snapshot.val()});
        }
      });
  };
  const LogOut = () => {
    dispatch(removeUser()), navigation.navigate('LoginScreen');
  };
  const renderItem = ({item}) => {
    // if (item.sendTime === moment().format('LLL')) {
    //   // console.log('iffff')
    //   setDate(moment(item.sendTime).format('LT'));
    // } else {
    //   // console.log('item.send_time',item.sendTime)
    //   setDate(moment(item.sendTime).format('LT'));
    // }
    // console.log(item)

    const chatList = () => {
      createChatList(item);
    };

    return (
      
      <View
        style={{flexDirection: 'row', flex: 1, borderWidth: 1, marginTop: 40}}>
        <View
          style={{
            marginLeft: 10,
            borderRadius: 100,
            height: 48,
            width: 50,
          }}>
          <Image
            source={{
              uri: 'https://media.gettyimages.com/photos/tesla-ceo-elon-musk-speaks-during-the-unveiling-of-the-new-tesla-y-picture-id1130598318?s=2048x2048',
            }}
            style={{
              position: 'absolute',
              justifyContent: 'flex-start',
              height: 48,
              width: 50,
              borderRadius: 100,
              borderWidth: 5,
            }}
          />
        </View>
        <TouchableOpacity onPress={() => chatList()}>
          <View style={{marginLeft: 40}}>
            <Text style={{color: '#707070', fontWeight: '500', fontSize: 15}}>
              {item.Name}
            </Text>
            <View style={{marginTop: 3}}>
              <Text style={{color: '#707070', fontWeight: '400', fontSize: 13}}>
                {item.lastMsg}
              </Text>
            </View>
          </View>
          <View style={{marginLeft: 230, flexDirection: 'row', marginTop: -21}}>
            <Text style={{color: '#B3B3B3'}}>
              {moment(item.sendTime).format('LT')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
            flexDirection: 'row',
          }}>
          <Text style={{color: '#2994FF', fontWeight: 'bold', fontSize: 30}}>
            Messages
          </Text>
          <View
            style={{height: 23, width: 23, left: 320, position: 'absolute'}}>
            <TouchableOpacity
              style={{height: 23, width: 23}}
              onPress={() => LogOut()}>
              <Image
                style={{height: 23, width: 23}}
                source={require('../../Assets/logout.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#f3f2f3',
              overflow: 'hidden',
              alignItems: 'center',
              flexDirection: 'row',
              height: 60,
              width: '77%',
              borderRadius: 6,
              borderColor: '#707070',
              marginHorizontal: 10,
              marginVertical: 20,
              borderWidth: 1,
            }}>
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
              }}
              source={require('../../Assets/search.png')}
            />
            <TextInput
              style={{flexWrap: 'wrap', flex: 1}}
              placeholder="Search"
              value={search}
              onChangeText={text => {
                setSearch(text);
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 5,
              marginTop: 22,
              backgroundColor: '#2994FF',
              width: 55,
              height: 60,
              borderRadius: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
              <Image
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 20,
                  width: 20,
                  marginLeft: 18,
                }}
                source={require('../../Assets/+.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: -40,
          borderWidth: 1,
          flex: 1,
          zIndex: 2,
        }}>
        <TouchableOpacity
          style={{
            // position: 'relative',
            // overflow: 'visible',
            // left: 170,
            // marginVertical: 290,
            // marginLeft: 140,
            // borderRadius: 100,
            height: 60,
            width: 60,
          }}
          onPress={() => navigation.navigate('AllUsers')}>
          <View style={{justifyContent: 'center', height: 30, width: 30}}>
            <Image
              style={{height: 40, width: 40}}
              source={require('../../Assets/newAllUsers.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
        <View>
          <FlatList data={SearchBtn} renderItem={renderItem} />
        </View>
      </View>
 
    </ScrollView>
  );
};

export default ChatList;
