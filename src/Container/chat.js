import {View, Text, Image, TouchableOpacity,SafeAreaView} from 'react-native';
import React,{ useState, useCallback, useEffect} from 'react';
import AllUsers from './allUsers';
import { GiftedChat } from 'react-native-gifted-chat'


const Chat = (props, {navigation}) => {
  // console.log(props.route.params);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <>
    <SafeAreaView>
    <View
      style={{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop: 30,
        alignItems: 'center',
      }}>
      <TouchableOpacity  style={{marginLeft:-20}} onPress={() => props.navigation.goBack()}>
        <Image
         
          source={require('../../Assets/leftarrow.png')}
        />
      </TouchableOpacity>

      <Text style={{fontWeight: '800', fontSize: 20}}>
        {props.route.params.Username}
      </Text>

      <TouchableOpacity onPress={() => alert('hello')}>
        <Image
          
          source={require('../../Assets/Vector.png')}
        />
      </TouchableOpacity>
    </View> 
    
    
         </SafeAreaView>
        <GiftedChat
        messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
         </>
    );
  };
    

export default Chat;

// import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
// import React, {useState,useEffect} from 'react';
// import {TextInput} from 'react-native-gesture-handler';
// import database from '@react-native-firebase/database';

// const Chat = () => {
//   const [result, setResult] = useState('');
//   const [itemArray, setItemArray] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState();
//   const [contacts,setContacts]=useState()

//   const [data, setData] = useState([]);
//   useEffect(() => {
//     readUserData();
//   }, []);

//   //ReadUser data from rnFirebase realtime DB
//   const readUserData = async () => {
//     database()
//       .ref('/Users/')
//       .on('value', snapshot => {
//          console.log("data ====>>>",Object.keys(Object.values(snapshot.val())))
//         setData(Object.values(snapshot.val())[3].contacts);
//       });
//   };
//   return (
//     <View>
//       <View
//         style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
//         <Text style={{color: '#2994FF', fontWeight: 'bold', fontSize: 30}}>
//           Messages
//         </Text>
//       </View>
//       <View style={{flexDirection: 'row'}}>
//         <View
//           style={{
//             backgroundColor: '#f3f2f3',
//             overflow: 'hidden',
//             alignItems: 'center',
//             flexDirection: 'row',
//             height: 60,
//             width: '77%',
//             borderRadius: 6,
//             backgroundColor: '#f2f3f2',
//             marginHorizontal: 10,
//             marginVertical: 20,
//           }}>
//           <Image
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginHorizontal: 10,
//             }}
//             source={require('../../Assets/search.png')}
//           />
//           <TextInput
//             style={{flexWrap: 'wrap', flex: 1}}
//             placeholder="Search"
//             value={result}
//             onChangeText={setResult}
//           />
//         </View>
//         <View
//           style={{
//             justifyContent: 'center',
//             marginLeft: 7,
//             marginTop: 22,
//             backgroundColor: '#2994FF',
//             width: 55,
//             height: 55,
//             borderRadius: 5,
//           }}>
//           <TouchableOpacity>
//             <Image
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: 20,
//                 width: 20,
//                 marginLeft: 18,
//               }}
//               source={require('../../Assets/+.png')}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <FlatList
//         data={data}
//         renderItem={({item}) =>
//         console.log("item==>0" ,item)
//        (
//           <View>
//             <View>
//               <Text style={{color: '#000', fontSize: 15}}>
//                 Name : {item}
//               </Text>
//               <Text style={{color: '#000', fontSize: 15}}>
//                 Phone-Number : {item.phoneNumber}
//               </Text>

//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default Chat;
