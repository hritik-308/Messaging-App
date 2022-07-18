import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setGroup} from '../redux/reducer/user';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {Button, Center, ScrollView} from 'native-base';

const Groups = ({navigation}, props) => {
  const [groupName, setgroupName] = useState();
  const [Data, setData] = useState([]);
  const [nUsers, setnUsers] = useState();
  const [Array, setArray] = useState([]);
  const [search, setSearch] = useState('');
  const {gData} = useSelector(state => state.Group);
  const GroupUsers = ('hi=========>', Data.map(item => item.roomId));
  const {userData} = useSelector(state => state.User);


  // console.log('fii====---->', GroupUsers);
  useEffect(() => {
    getAllGroups();
    // chlist();
    // console.log('hii================>>>>>>',allUser);
  }, []);

  const getAllGroups = async () => {
    firebase
      .database()
      .ref('/Groups/')
      .on('value', snapshot => {
        setData(Object.values(snapshot.val()));
      });
  };

  const createGroupChat = data => {
    firebase
      .database()
      .ref('/GroupChat/')
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          let myData = {
            GroupChatId: uuid.v4(),
            groupName: GroupUsers,
            SenderId: userData.id,
            msg: '',
          };
          firebase
            .database()
            .ref('/GroupChat/' + data.groupId + '/' + userData.id)
            .update(myData);

          navigation.navigate('GrpMessages', {GroupUsers: data.groupId});
        }
        // else {
        //   navigation.navigate('GrpMessages', {GroupUsers: snapshot.val()});
        // }
      });
  };
  const renderItem = ({item}) => {
    const gchatList = () => {
      createGroupChat(item);
     
    };

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
              height: 50,
              width: 50,
              borderRadius: 80,
              borderWidth: 5,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GrpMessages', {
              gId: item.groupId,
              RoomId: item.roomId,
              groupName: item.groupName,
            })
          }>
          <View style={{marginLeft: 40}}>
            {/* {setArray(item)} */}
            <Text style={{fontWeight: '900', color: '#000'}}>
              {item.groupName}
            </Text>
            <View>
              <Text style={{color: '#000'}}>{item.groupDiscription}</Text>
              <View
                style={{marginLeft: 220, flexDirection: 'row', marginTop: -20}}>
                <Text style={{color: '#000'}}>5:11</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 25, color: '#000', fontWeight: 'bold'}}>
          Groups
        </Text>
      </View>
      <FlatList
        data={Data}
        keyExtractor={item => item.id}
        renderItem={item => renderItem(item)}
        // horizontal={true}

        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Groups;
