import { View, Text,TouchableOpacity,TextInput,FlatList,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setGroup } from '../redux/reducer/user';
import uuid from 'react-native-uuid'
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { Button, ScrollView } from 'native-base';


const Groups = ({navigation},props) => {

    const[groupName,setgroupName]=useState();
    const [data, setData] = useState([])
    const[nUsers,setnUsers]=useState();
    const[Array,setArray]=useState([]);
  const [search, setSearch] = useState('');
  const {userData} = useSelector(state => state.User);
  const GroupUsers=('hi=========>',data.map(item=>(item.groupId)))

//  console.log(GroupUsers)
//  const grpData=props.gData
  // console.log('fii====---->',grpData)
  useEffect(() => {
    getAllGroups();
    // chlist();
    // console.log('hii================>>>>>>',allUser);
  }, []);

    const getAllGroups =async () => {
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
        .ref('/GroupChat/' )
        .once('value')
        .then(snapshot => {
          // console.log('User data: ', snapshot.val());
  
          if (snapshot.val() == null) {
            let myData = {
              GroupChatId:uuid.v4(),
              GroupId:GroupUsers,
              SenderId:userData.id,
              msg:''

            };
            firebase
            .database()
            .ref('/GroupChat/' + data.id + '/' + userData.id)
            .update(myData);
           
            navigation.navigate('GrpMessages', {GroupUsers: data});
          } else {
            navigation.navigate('GrpMessages', {GroupUsers: snapshot.val()});
          }
        });
    };
    const renderItem=({item})=>{
      const gchatList = () => {
        createGroupChat(item);
        // navigation.navigate('Chat', {Username: item.Name,chatroomId : data.roomId,userData:userData.id,recieverDatas:data.id,})
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
                  height: 40,
                  width: 40,
                  borderRadius: 80,
                  borderWidth: 5,
                }}
              />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('GrpMessages')}>
              <View style={{marginLeft: 40}}>
                {/* {setArray(item)} */}
                <Text style={{fontWeight: 'bold'}}>{item.groupName}</Text>
                <View>
                  <Text style={{color: '#000'}}>{item.groupDiscription}</Text>
                </View>
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
      <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem(item)}
      // horizontal={true}

      showsHorizontalScrollIndicator={false}
    />
    </View>
  )
}

export default Groups