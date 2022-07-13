import { View, Text,TouchableOpacity,TextInput} from 'react-native'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { setGroup } from '../redux/reducer/user';
import uuid from 'react-native-uuid'
import { firebase } from '@react-native-firebase/database';

const GroupChat = ({navigation},values,) => {
// console.log('sijdfn===<><><><>',navigation)
    const dispatch=useDispatch()
    const [groupDiscription, setgroupDiscription] = useState('');
 
    const[groupName,setgroupName]=useState();
    const [gData, setGData] = useState([])
    const[nUsers,setnUsers]=useState();
    const[userrsId,setuserrsId]=useState([]);



    const CreateGroup=()=>{



        const GroupData = {
            groupId:uuid.v4(),
            groupName: groupName,
            groupDiscription:groupDiscription,
            no_of_users:nUsers,
            userrsName:usersData.Name
          };
          const newReference = firebase.database().ref('/Groups/' +GroupData.groupId);
          //Creating refernce in rnFirebase
          newReference
            .set(GroupData)
            .then(() => console.log('Data updated.'))
            .then(() => dispatch(setGroup(GroupData)))
    }

    const addGroup =()=>{
        CreateGroup()
        navigation.navigate('AllUsers' ,{GroupData:gData} )

    }



  return (
    <View>
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
                   onChangeText={text => setuserrsId(text)}
                    value={values.userrsId}
                    placeholder="Enter Member name"
                    withShadow
                    autoFocus
                    />

            </View>


      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginTop:30}} onPress={addGroup}>
       <Text style={{fontWeight:'bold',borderWidth:3}}>CreateGroup</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GroupChat