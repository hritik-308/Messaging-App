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
import {setGroup} from '../redux/reducer/Group';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {Button, ScrollView} from 'native-base';
import {array, object} from 'yup';

const AddGroupUsr = ({navigation}, values) => {
  const dispatch = useDispatch();
  const [groupDiscription, setgroupDiscription] = useState('');

  const [groupName, setgroupName] = useState();
  const [gData, setGData] = useState([]);
  const [nUsers, setnUsers] = useState([]);
  const [Array, setArray] = useState([]);
  const [allUser, setallUser] = useState([]);
  const [allUserBackup, setallUserBackup] = useState([]);
  const [filterUser, setfilterUser] = useState([]);
  const [search, setSearch] = useState('');
  const {GroupDatas} = useSelector(state => state.Group);

  const {userData} = useSelector(state => state.User);

  //    console.log('Array========><><><><>',Array)
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    firebase
      .database()
      .ref('/users/')
      .once('value')
      .then(snapshot =>
        setallUser(
          Object.values(snapshot.val()).filter(it => it.id !== userData.id),
        ),
      );
  };

  const SearchBtn =
    // alert(search)
    allUser.filter(val => {
      if (search == '') {
        return val;
      } else if (val.Name.toLowerCase().includes(search.toLowerCase())) {
        return val;
      }
    });
  const CreateGroup = () => {
    let roomId = uuid.v4();
    const GroupData = {
      roomId,
      groupId: uuid.v4(),
      groupName: groupName,
      groupDiscription: groupDiscription,
      usersData: {
        users: nUsers,
      },
      // userrsName:GroupDatas.groupName
    };
    const newReference = firebase
      .database()
      .ref('/Groups/' + GroupData.groupId);
    //Creating refernce in rnFirebase
    newReference
      .set(GroupData)
      // .then(() => console.log('Data updated.'))
      .then(() => dispatch(setGroup(GroupData)));
  };
  // console.log(GroupData)

  const addGroup = () => {
    AddUser();
    CreateGroup();
    navigation.navigate('Groups', {Members: nUsers});
  };

  const AddUser = () => {
    const users = firebase
      .database()
      .ref('/users/')
      .once('value')
      .then(snapshot => {
        setArray(Object.values(snapshot.val()));

        // console.log(Object.values(snapshot.val()));
        // .map(item=>{setArray({
        //     Name: item.Name,
        //     phoneNumber: item.phoneNumber,
        //     id: item.id
        //   })});
      });
  };
  const setUserArray = item => {
    const isFound = nUsers.some(element => {
      if (element.id === item.id) {
        return true;
      } else {
        return false;
      }
    });
    if (!isFound) {
      setnUsers([...nUsers, item]);
    }
  };
  //   console.log('adduser',Array)

  console.log('dewedw', nUsers);

  return (
    <ScrollView>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 25, color: '#000', fontWeight: 'bold'}}>
          Create Group
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginRight: 50}}>
        <Text
          style={{
            marginRight: 60,
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
          }}>
          Group Name :
        </Text>
        <TextInput
          onChangeText={text => setgroupName(text)}
          value={values.groupName}
          placeholder="Enter Group Name"
          withShadow
          autoFocus
        />
      </View>
      <View style={{flexDirection: 'row', marginRight: 50}}>
        <Text
          style={{
            marginRight: 15,
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
          }}>
          Group Discription :
        </Text>
        <TextInput
          onChangeText={text => setgroupDiscription(text)}
          value={values.groupDiscription}
          placeholder="Enter Group Didcription"
          withShadow
          autoFocus
        />
      </View>

      <View style={{flexDirection: 'row', marginRight: 50, marginTop: 20}}>
        <Text
          style={{
            marginRight: 60,
            marginTop: 15,
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
          }}>
          Add Members :
        </Text>

        <TextInput
          style={{flexWrap: 'wrap', flex: 1, borderWidth: 1}}
          placeholder="Search"
          value={search}
          onChangeText={text => {
            setSearch(text);
          }}
        />
      </View>
      {/* <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
        onPress={() => setGData(search)}>
        <Text>Add Members</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}
        onPress={addGroup}>
        <Text style={{fontWeight: 'bold', borderWidth: 3}}>CreateGroup</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
          onPress={() => navigation.navigate('Groups')}>
          <Text>Groups</Text>
        </TouchableOpacity> */}
      <FlatList
        nestedScrollEnabled
        data={SearchBtn}
        renderItem={({item}) => {
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
              <TouchableOpacity
                onPress={() => {
                  // console.log(item)
                  setUserArray(item);
                  // setnUsers(item)
                }}>
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
        }}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default AddGroupUsr;
