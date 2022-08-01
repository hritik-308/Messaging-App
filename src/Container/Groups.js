import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setGroup} from '../redux/reducer/user';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {Button, Center, ScrollView} from 'native-base';
import GroupChat from './GroupChat';

const Groups = ({navigation}, props) => {
  const [groupName, setgroupName] = useState();
  const [Data, setData] = useState([]);
  const [nUsers, setnUsers] = useState();
  const [Array, setArray] = useState([]);
  const [search, setSearch] = useState('');
  const {gData} = useSelector(state => state.Group);
  const GroupUsers = ('hi=========>', Data.map(item => item.roomId));
  const {userData} = useSelector(state => state.User);

  // console.log('fii====---->',props.route.params);
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
        
        // console.log('grp Data==>',(Object.values(snapshot.val())))
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

            // if(userData.id===){

            // }

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
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View
          style={{
            marginLeft: 20,
            borderRadius: 100,
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
                style={{marginLeft: 210, flexDirection: 'row', marginTop: -25}}>
                <Image source={require('../../Assets/msgLogo.png')} />
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
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        {/* <Text style={{borderRadius:10}}>Create Group </Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('AddGroupUsr')}>
          <View
            style={{
              flexDirection: 'row',
              overflow: 'hidden',
              marginRight: 130,
              marginTop: 20,
            }}>
            <Image
              style={{height: 40, width: 40, borderRadius: 20}}
              source={require('../../Assets/Group.png')}
            />
            <View style={{marginLeft: 40}}>
              <Text style={{color: '#000'}}>New Group</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginRight: 240, marginTop: 30}}>
          <Text style={{color: '#000'}}>All Groups</Text>
        </View>
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
