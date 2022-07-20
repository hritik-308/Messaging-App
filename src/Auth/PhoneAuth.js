import React, {useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  phone,
  Image,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import Chat from '../Container/chat';
import AllUsers from '../Container/allUsers';
import { firebase } from '@react-native-firebase/database';
import uuid from 'react-native-uuid'
import { useDispatch, useSelector } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import {setUser} from '../redux/reducer/user'


export default function LoginScreen({navigation},values) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uData, setUData] = useState([])
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const[Name,setName]=useState();
  const [code, setCode] = useState('');
  const [Account,setAccount]=useState()


  const dispatch=useDispatch()
  // const {currUser}= useSelector(state =>state.User.userData)
  const createUser = async () => {
    const usersData = {
      id:uuid.v4(),
      Name: Name,
      phoneNumber:phoneNumber,
    };
    const newReference = firebase.database().ref('/users/' + usersData.id);
    //Creating refernce in rnFirebase
    newReference
      .set(usersData)
      .then(() => console.log('Data updated.'))
      .then(() => dispatch(setUser(usersData)))
      // .then(() => navigation.navigate('Chat'));
  };

  const loginUser = async () => {
    database()
      .ref('/users/')

      .once('value')
      .then( async snapshot => {
        if (snapshot.val() == null) {
           SimpleToast.show("Invalid phoneNumber!");
           return false;
        }
        let userData = Object.values(snapshot.val())[0];
       

        console.log('User data:===========> ', userData);
        dispatch(setUser(userData));
         setAccount(userData);
        SimpleToast.show("Login Successfully!");
      });
  };

  const AddUser =()=>{
    createUser(),
    confirmCode()
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(
      '+91' + phoneNumber,
    );
    setConfirm(confirmation);
  }
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      navigation.replace('AllUsers',{userData:uData});
    } catch (error) {
      Alert.alert('Invalid code.', error.message);
    }
  }
  if (!confirm) {
    // const onChangeNumber = ()=>{
    //   setPhoneNumber()
    // }
    return (
      <>
        <SafeAreaView
          style={{paddingHorizontal: 60, backgroundColor:'#fff'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Text
                style={{
                  fontSize: 31,
                  padding: 4,
                  fontWeight: 'bold',
                  color:'#000',
                }}>
                Enter
              </Text>
              <Text
                style={{
                  fontSize: 31,
                  padding: 4,
                  fontWeight: 'bold',
                  color:'#64beff',
                }}>
                Your
              </Text>
              <Text
                style={{
                  fontSize: 31,
                  padding: 4,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Phone,
              </Text>
            </View>

            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: '#a5a5a5'}}>
              You Will Receive a 6 digit code for phone number verification
            </Text>
          </ScrollView>
          </SafeAreaView>
        <View
          style={{
            padding: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#fff',
          }}>
             <View style={{flexDirection:'row',marginRight:50}}>

                  <Text style={{marginRight:60,marginTop:15,fontWeight:'bold',fontSize:20,color:"#000"}}>Name :</Text>
                   <TextInput
                   onChangeText={text => setName(text)}
                    value={values.Name}
                    placeholder="Enter Your Name"
                    withShadow
                    autoFocus
                    />
            </View>
          <PhoneInput
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            withShadow
            autoFocus
            />

          <TouchableHighlight
            style={{
              marginRight: 40,
              marginLeft: 50,
              marginTop: 12,
              paddingTop: 15,
              paddingBottom: 12,
              textAlign: 'center',
              backgroundColor: '#fff',
              borderRadius: 19,
              borderWidth: 2,
              borderColor: 'black',
            }}
            onPress={() => signInWithPhoneNumber(phoneNumber)}
            underlayColor="#226557">
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                marginRight: 10,
                marginLeft: 16,
              }}>
              Continue{' '}
            </Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            margin: 4,
            fontWeight: 'bold',
            fontSize: 37,
            color: '#64beff',
          }}>
          Verify
        </Text>
        <Text
          style={{
            margin: 4,
            fontWeight: 'bold',
            fontSize: 37,
            color: '#000',
          }}>
          Phone
        </Text>
      </View>
      <Image
        source={require('../../Assets/otps.png')}
        style={{
          height: 50,
          width: 40,
          padding: 65,
          marginTop: 25,
          marginLeft: 48,
        }}
      />
      <Text style={{margin: 60, fontSize: 16, color:'#fff'}}>
        Code is Send To Given Number
      </Text>
      <TextInput
        keyboardType="phone-pad"
        style={{
          color: 'black',
          borderWidth: 1,
          width: 150,
          marginBottom: 20,
          borderRadius: 19,
        }}
        value={code}
        onChangeText={text => setCode(text)}
      />
      {/* <OtpInputs
          handleChange={(code) => setCode(code)}
          numberOfInputs={6}
        /> */}
      <Button title="Enter OTP" onPress={() => AddUser()} color="#64beff" />
    </View>
  );
}





// import React, {useState,useEffect} from 'react';
// import {
//   Button,
//   TextInput,
//   View,
//   Alert,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   TouchableHighlight,
//   phone,
//   Image,
//   ImageBackground,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import PhoneInput from 'react-native-phone-number-input';
// import {database} from '@react-native-firebase/database';
// import { firebase } from '@react-native-firebase/auth';
// import Chat from '../Container/chat';
// import uuid from 'react-native-uuid';

// export default function LoginScreen({navigation},values) {

//   const [phoneNumber, setPhoneNumber] = useState('');

//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);
//   const[Name,setName]=useState();
//   const [code, setCode] = useState('');
//   // const createUser = () => {
//   //   const newReference = firebase.database().ref('/Users' +userData.uid);
//   //   const userData = {
//   //     uid:uuid.v4(),
//   //     Name: Name,
//   //     phoneNumber:phoneNumber,
//   //   };
//   //   //Creating refernce in rnFirebase
//   //   newReference
//   //     .set(userData)
//   //     .then(() => console.log('Data updated.'))
//   //     // .then(() => navigation.navigate('Chat'));
//   // };

//   // const AddUser =()=>{
//   //   createUser(),
//   //   confirmCode()
//   // }
//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(
//       '+91' + phoneNumber,
//     ).uid;
//     setConfirm(confirmation);
//   }
//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//      navigation.navigate('Chat')
//     } catch (error) {
//       Alert.alert('Invalid code.', error.message);
//     }
//   }
//   console.log('jhsvdfvfd=====>',confirm)
//   if (!confirm) {
//     // const onChangeNumber = ()=>{
//     //   setPhoneNumber()
//     // }
//     return (
//       <>
//         <SafeAreaView
//           style={{paddingHorizontal: 20, backgroundColor:'#fff'}}>
//           <ScrollView showsVerticalScrollIndicator={false}>
            
//             <View style={{flexDirection: 'row', marginTop: 80}}>
//               <Text
//                 style={{
//                   fontSize: 31,
//                   padding: 4,
//                   fontWeight: 'bold',
//                   color: 'black',
//                 }}>
//                 Enter
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 31,
//                   padding: 4,
//                   fontWeight: 'bold',
//                   color:'dodgerblue',
//                 }}>
//                 Your
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 31,
//                   padding: 4,
//                   fontWeight: 'bold',
//                   color: 'dodgerblue',
//                 }}>
//                 Phone,
//               </Text>
//             </View>

//             <Text
//               style={{fontSize: 14, fontWeight: 'bold', color: 'blue'}}>
//               You Will Receive a 6 digit code for phone number verification
//             </Text>
//           </ScrollView>
//         </SafeAreaView>
//         <View
//           style={{
//             padding: 90,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#fff',
//           }}>
//             <View style={{flexDirection:'row',marginRight:50}}>

//             {/* <Text style={{marginRight:60,marginTop:15,fontWeight:'bold',fontSize:20,color:"#000"}}>Name :</Text>
//             <TextInput
//             onChangeText={text => setName(text)}
//             value={values.Name}
//             placeholder="Enter Your Name"
//             withShadow
//             autoFocus
//           /> */}
//           </View>
//           <PhoneInput
//             onChangeText={text => setPhoneNumber(text)}
//             value={values.phoneNumber}
//             placeholder="Enter Phone Number"
//             keyboardType="phone-pad"
//             withShadow
//             autoFocus
//           />

//           <TouchableHighlight
//             style={{
            
//               textAlign: 'center',
//               backgroundColor: "dodgerblue",
//               width:250,
//               height:55,
//               borderRadius:20,
//               borderColor: 'black',
//               marginTop:100
//             }}
//             onPress={() => signInWithPhoneNumber(phoneNumber)}
//             underlayColor="#226557">
//             <Text
//               style={{
//                 color: 'black',
//                 textAlign: 'center',
//                marginTop:15,
//                fontWeight:'bold',
//                fontSize:20
//               }}>
//               Continue{' '}
//             </Text>
//           </TouchableHighlight>
//         </View>
//       </>
//     );
//   }
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 1,
//       }}>
//       <View style={{flexDirection: 'row'}}>
//         <Text
//           style={{
//             margin: 4,
//             fontWeight: 'bold',
//             fontSize: 37,
//             color: "dodgerblue",
//           }}>
//           Verify
//         </Text>
//         <Text
//           style={{
//             margin: 4,
//             fontWeight: 'bold',
//             fontSize: 37,
//             color: "#fff",
//           }}>
//           Phone
//         </Text>
//       </View>
     
//       <Text style={{margin: 60, fontSize: 16, color: 'blue'}}>
//         Code is Send To Given Number
//       </Text>
//       <TextInput
//         keyboardType="phone-pad"
//         style={{
//           color: 'black',
//           borderWidth: 1,
//           width: 150,
//           marginBottom: 20,
//           borderRadius: 19,
//         }}
//         value={code}
//         onChangeText={text => setCode(text)}
//       />
//       {/* <OtpInputs
//           handleChange={(code) => setCode(code)}
//           numberOfInputs={6}
//         /> */}
//       <Button title="Enter OTP" onPress={() => confirmCode()} color="#64beff" />
//     </View>
//   );
// }