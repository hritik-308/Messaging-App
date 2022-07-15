import { View, Text,Image,TouchableOpacity } from 'react-native'
import React , {useState,useEffect} from 'react';
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { FlatList } from 'native-base';

const ChatList = ({navigation}) => {

    const {userData} = useSelector(state => state.User);

  // console.log("userData",userData);

  const [chatList, setchatList] = useState([]);

  useEffect(() => {
    getChatlist();
  }, []);

 const getChatlist = async () => {
    firebase
    .database()
    .ref('/chatlist/'+userData?.id)
    .on('value', snapshot => {
    //   console.log('User data: ', (Object.values(snapshot.val())));
      if (snapshot.val() != null) {
        setchatList(Object.values(snapshot.val()))
      }else 
      {
        return (
            alert('chatlist is empty')
            )
      }
    });
  
  }




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
  const renderItem = ({item}) => {
    const chatList = () => {
      createChatList(item);
      // navigation.navigate('Chat', {Username: item.Name,chatroomId : data.roomId,userData:userData.id,recieverDatas:data.id,})
    };
    // console.log('dewedw');

    return (
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <View
          style={{
            marginLeft: 20,
            borderRadius: 80,
            borderWidth: 4,
            borderColor: '#2994FF',
          }}>
          <Image
            source={{
              uri: 'https://media.gettyimages.com/photos/tesla-ceo-elon-musk-speaks-during-the-unveiling-of-the-new-tesla-y-picture-id1130598318?s=2048x2048',
            }}
            style={{
              justifyContent: 'flex-start',
              height: 40,
              width: 40,
              borderRadius: 80,
              borderWidth: 5,
            }}
          />
        </View>
        <TouchableOpacity onPress={() => chatList()}>
          <View style={{marginLeft: 40}}>
            <Text style={{fontWeight: 'bold'}}>{item.Name}</Text>
            {/* <View>
              <Text style={{color: '#000'}}>{chlist()}</Text>
            </View> */}
          </View>
          <View style={{marginLeft: 250, flexDirection: 'row'}}>
            <Text style={{color: '#000'}}>5:11</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <Text>ChatList</Text>
      <FlatList
      data={chatList}
      renderItem={renderItem}
      />
    </View>
  )
}

export default ChatList