import { View, Text,Image,TouchableOpacity ,TextInput} from 'react-native'
import React , {useState,useEffect} from 'react';
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { FlatList, ScrollView } from 'native-base';

const ChatList = ({navigation}) => {

    const {userData} = useSelector(state => state.User);
    
  // console.log("userData",userData);

  const [chatList, setchatList] = useState([]);
   const [search, setSearch] = useState('');

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
    <ScrollView>
    <View>
    <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
        <Text style={{color: '#2994FF', fontWeight: 'bold', fontSize: 30}}>
          Messages
        </Text>
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
            backgroundColor: '#f2f3f2',
            marginHorizontal: 10,
            marginVertical: 20,
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
            style={{flexWrap: 'wrap', flex: 1, borderWidth: 1}}
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
            marginLeft: 7,
            marginTop: 22,
            backgroundColor: '#2994FF',
            width: 55,
            height: 55,
            borderRadius: 5,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('GroupChat')}>
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
      <FlatList
      data={chatList}
      renderItem={renderItem}
      />

    </View>
    
    </ScrollView>
  )
}

export default ChatList