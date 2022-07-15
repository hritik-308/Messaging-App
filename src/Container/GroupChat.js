import { View, Text,TouchableOpacity,TextInput,FlatList,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setGroup } from '../redux/reducer/user';
import uuid from 'react-native-uuid'
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { Button, ScrollView } from 'native-base';

const GroupChat = ({navigation},values,) => {
// console.log('sijdfn===<><><><>',navigation)
    const dispatch=useDispatch()
    const [groupDiscription, setgroupDiscription] = useState('');
 
    const[groupName,setgroupName]=useState();
    const [gData, setGData] = useState([])
    const[nUsers,setnUsers]=useState();
    const[Array,setArray]=useState([]);
    const [allUser, setallUser] = useState([]);
  const [allUserBackup, setallUserBackup] = useState([]);
  const [filterUser, setfilterUser] = useState([]);
  const [search, setSearch] = useState('');
  const {GroupDatas} = useSelector(state => state.Group);


  //  console.log(Array)

  useEffect(() => {
    getAllUser();
    // chlist();
    // console.log('hii================>>>>>>',allUser);
  }, [allUser]);

    const getAllUser = () => {
      firebase
        .database()
        .ref('/users/')
        .once('value')
        .then(snapshot => {
          // console.log('alluser Data:', userData);
          setallUser(
            Object.values(snapshot.val()).filter(it => it.id !== GroupDatas.id),
          );
          setallUserBackup(
            Object.values(snapshot.val()).filter(it => it.id !== GroupDatas.id),
          );
        });
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

      useEffect(() => {
        readUserData();
      }, []);
    
      //ReadUser data from rnFirebase realtime DB
      let readUserData = async () => {
        database()
          .ref('/Groups/')
          .on('value', snapshot => {
            
            setGrpUsers(Object.values(snapshot.val()));
          });
      };


    const CreateGroup=()=>{
      let roomId = uuid.v4();
        const GroupData = {
            roomId,
            groupId:uuid.v4(),
            groupName: groupName,
            groupDiscription:groupDiscription,
            usersData:{
              UsersId:uuid.v4(),
              users: allUser
            },
            userrsName:GroupDatas.groupName
          };
          const newReference = firebase.database().ref('/Groups/' +GroupData.groupId);
          //Creating refernce in rnFirebase
          newReference
            .set(GroupData)
            // .then(() => console.log('Data updated.'))
            .then(() => dispatch(setGroup(GroupData)))
    }

    const addGroup =()=>{
        CreateGroup()
        navigation.navigate('Groups' ,{GroupData:gData} )

    }

  return (
    <ScrollView>
      <Text>GroupChat</Text>
      <View style={{flexDirection:'row',marginRight:50}}>

                  <Text style={{marginRight:60,marginTop:15,fontWeight:'bold',fontSize:20,color:"#000"}}>Group Name :</Text>
                   <TextInput
                   onChangeText={text => setgroupName(text)}
                    value={values.groupName}
                    placeholder="Enter Group Name"
                    withShadow
                    autoFocus
                    />

            </View>
            <View style={{flexDirection:'row',marginRight:50}}>

                  <Text style={{marginRight:60,marginTop:15,fontWeight:'bold',fontSize:20,color:"#000"}}>Group Discription :</Text>
                   <TextInput
                   onChangeText={text => setgroupDiscription(text)}
                    value={values.groupDiscription}
                    placeholder="Enter Group Didcription"
                    withShadow
                    autoFocus
                    />

            </View>

            <View style={{flexDirection:'row',marginRight:50}}>
                  <Text style={{marginRight:60,marginTop:15,fontWeight:'bold',fontSize:20,color:"#000"}}>Add Members :</Text>

                



            <TextInput
            style={{flexWrap: 'wrap', flex: 1, borderWidth: 1}}
            placeholder="Search"
            value={search}
            onChangeText={text => {
              setSearch(text);
            }}
            />
            </View>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginTop:10}} onPress={()=>setuserrsId(search)}>
              <Text>
                Add Members
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginTop:30}} onPress={addGroup}>
       <Text style={{fontWeight:'bold',borderWidth:3}}>CreateGroup</Text>
      </TouchableOpacity>
      {/* <FlatList
          nestedScrollEnabled
          data={SearchBtn}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        /> */}
         <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginTop:10}} onPress={()=>navigation.navigate('Groups')}>
              <Text>
                Groups
              </Text>
            </TouchableOpacity>
        
    </ScrollView>
  )
}

export default GroupChat