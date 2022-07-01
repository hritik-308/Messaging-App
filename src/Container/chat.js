import { View, Text,Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'


const Chat = () => {
  const [result, setResult] = useState('')
  const [itemArray, setItemArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
    <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
      <Text style={{color:'#2994FF',fontWeight:'bold',fontSize:30}}>Messages</Text>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={{ backgroundColor:'#f3f2f3',overflow:'hidden',alignItems:'center',flexDirection:'row',height: 60,width:'77%',borderRadius:6,backgroundColor:'#f2f3f2',marginHorizontal:10,marginVertical:20}}>
    <Image
      style={{justifyContent:'center',alignItems:'center',marginHorizontal:10,}}
      source={require('../../Assets/search.png')}
    />
    <TextInput
      style={{flexWrap:'wrap', flex:1}}
      placeholder="Search"
      value={result}
      onChangeText={setResult}
    />
    </View>
    <View style={{justifyContent:'center',marginLeft:7,marginTop:22,backgroundColor:'#2994FF',width:55,height:55,borderRadius:5}}>
     <TouchableOpacity>
      <Image style={{justifyContent:'center',alignItems:'center',height:20,width:20,marginLeft:18}} source={require('../../Assets/+.png')}/>
     </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

export default Chat


// import React, {Component} from 'react';
// import {
//   Image,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   AsyncStorage,
// } from 'react-native';

// import {firebase,database} from '@react-native-firebase/database';                                                                                                                                                                                                                                                                                                                                   
// // import User from '../User';

// export default class HomeScreen extends Component {
//   static navigationOptions = ({navigation, route}) => ({
//     title: 'Chats',
//     headerLeft: null,
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//         {/* <Image
//           source={require('../images/user.png')}
//           style={{width: 32, height: 32, marginRight: 10}}
//         /> */}
//         <Text>odngidsk</Text>
//       </TouchableOpacity>
//     ),
//   });

//   state = {
//     users: [],
//   };

//   UNSAFE_componentWillMount() {
//     let dbRef =database().ref('/Users');
//     dbRef.on('child_added', val => {
//       let person = val.val();
//       person.phone = val.key;
//       if (person.phone === User.phone) {
//         User.name = person.name;
//       } else {
//         this.setState(prevState => {
//           return {
//             users: [...prevState.users, person],
//           };
//         });
//       }
//     });
//   }

//   _logOut = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };

//   renderRow = ({item}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => this.props.navigation.navigate('Chat', item)}
//         style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1}}>
//         <Text style={{fontSize: 20}}>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     if (!User.phone) {
//       this.props.navigation.navigate('Auth');
//     }

//     return (
//       <SafeAreaView>
//         <FlatList
//           data={this.state.users}
//           renderItem={this.renderRow}
//           keyExtractor={item => item.phone}
//         />
//       </SafeAreaView>
//     );
//   }
// }
