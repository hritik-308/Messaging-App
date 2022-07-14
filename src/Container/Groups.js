import { View, Text,TouchableOpacity,TextInput,FlatList,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setGroup } from '../redux/reducer/user';
import uuid from 'react-native-uuid'
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { Button, ScrollView } from 'native-base';


const Groups = () => {

    const[groupName,setgroupName]=useState();
    const [gData, setGData] = useState([])
    const[nUsers,setnUsers]=useState();
    const[Array,setArray]=useState([]);
    const [allGroups, setallAllGroups] = useState([]);
  const [allUserBackup, setallUserBackup] = useState([]);
  const [filterUser, setfilterUser] = useState([]);
  const [search, setSearch] = useState('');
  const {userData} = useSelector(state => state.User);


  //  console.log(Array)

  useEffect(() => {
    getAllUser();
    // chlist();
    // console.log('hii================>>>>>>',allUser);
  }, [allUser]);

    const getAllGroups = () => {
      firebase
        .database()
        .ref('/Groups/')
        .once('value')
        .then(snapshot => {
          // console.log('alluser Data:', userData);
          setallUser(
            Object.values(snapshot.val()),
          );
          setallUserBackup(
            Object.values(snapshot.val()),
          );
        });
    };
    const renderItem=({item})=>{

 
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
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dh9ayOD6Z3q8Beu01vHFIU07lOzegKMTFjCrxDipAg&s',
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
            <TouchableOpacity onPress={setArray(item)}>
              <View style={{marginLeft: 40}}>
                {/* {setArray(item)} */}
                <Text style={{fontWeight: 'bold'}}>{item.groupName}</Text>
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
      }
  return (
    <View>
      <Text>Groups</Text>
    </View>
  )
}

export default Groups