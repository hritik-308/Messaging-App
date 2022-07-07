import React,{useState} from 'react'
import { View, Text ,TextInput,Image,StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import {launchImageLibrary} from 'react-native-image-picker';

import auth, { firebase,database } from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage'

import * as yup from 'yup';
import { Formik } from 'formik';
import AllUsers from '../allUsers';



export default function Profile ({navigation}) {

    const [downloadurl, setDownloadurl] = useState("https://reactjs.org/logo-og.png")


    //open library and upload pic to firebase
    const pickImageAndUpload = ()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
        //    console.log(fileobj.assets[0].uri)
         const uploadTask =  storage().ref().child(`/profilePictures/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
                 (snapshot) => {
  
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) alert('image uploaded')
                    
                }, 
                (error) => {
                    alert("error uploading image",error)
                }, 
                //For fetching uploaded photo url
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setDownloadurl(downloadURL)
                    });
                }
                );
        })
    }

    //Form validation YUP Schema
    const loginValidationSchema = yup.object().shape({
      name: yup.string().min(3, 'must be at least 3 characters long').required("Name must be required"),
    
      
    }); 

    // Create user in rnFirebase
      const createUser = async (values) => {
    const usersData = {
      id: uuid.v4(),
      Name: Name,
      img:downloadurl,
      phoneNumber: props.route.params.phoneNumber,
    };
    const newReference = firebase.database().ref('/users/' + usersData.id);
    //Creating refernce in rnFirebase
    newReference
      .set(usersData)
      .then(() => console.log('Data updated.'))
      .then(() => dispatch(setUser(usersData)));
    // .then(() => navigation.navigate('Chat'));
  };
    
    return (
      <Formik
      initialValues={{name:'',phone:'+91',}}
      validateOnMount={true}
      onSubmit={
        values => {createUser(values)} 
       //  console.log(values.email)
      }
      validationSchema={loginValidationSchema}
    >
     {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
      <ScrollView style={styles.main}>
      <View>
              <Image
              style={{height:170,width:170,borderWidth:2,borderColor:"dodgerblue",borderRadius:85,marginHorizontal:120,marginVertical:15}}
              source={{uri:downloadurl}}/>

            <View style={styles.box2}>
               
               
                <TouchableOpacity style={styles.tco} onPress={()=>pickImageAndUpload()}>
                    <Image 
                      style={styles.cty}
                      source={require('../../../Assets/pluss.png')}/>
                </TouchableOpacity>
               

            </View>
      </View>
          
         <View>

            <Text style={styles.Texts}>Enter Name :</Text>
            <TextInput
              style={styles.input}
              placeholder="John Cena"
              autoCapitalize='none'
              // value={name}
              // onChangeText={text => setName(text)}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {(errors.name && touched.name) && 
              <Text style={styles.ErrorText}>{errors.name}</Text>
            }


           
            <TouchableOpacity  onPress={()=>navigation.navigate(AllUsers) (handleSubmit)}>
          
              <View style={styles.button}>
                <Text style={{color:'white'}}>Create User</Text>
              </View>

            </TouchableOpacity>
         </View>
       
         </ScrollView>
         )}

</Formik>
    
    )
}


const styles = StyleSheet.create({
    text:{
        fontSize:22,
        color:"dodgerblue",
        margin:20,
       
    },
  
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        
    },
    input: {
      height: 40,
      width:350,
      margin: 12,
      borderWidth: 1,
      borderRadius:50,padding:11
  
    },
    Texts:{
        marginTop:10,
      marginLeft:20,
      color:'#000'
    },
    button: {
      justifyContent:'center',
      alignItems: "center",
      backgroundColor: "#64beff",
      padding: 10,
      width:150,
      borderRadius:50,
      marginTop:40,
      marginLeft:115,
  
    },
    ErrorText:{
      marginLeft:20,
      marginTop:-10,
      color:'red'
    },
 
  mod:{
    color:'dodgerblue',
    margin:20,
    flexDirection:'row',
    justifyContent:'space-around'
   

  },
  tco:{
    flex:1,
    color:'dodgerblue'
  },
  cty:{
    position:'absolute',
    justifyContent:'center',
    alignItems: "center",
    padding: 1,
    marginLeft:140,
    // marginTop:30,
    bottom:15,
    left:60,
    height:35,
    width:35,
    backgroundColor:'#fff',
    borderRadius:20,
    borderColor:"dodgerblue",
    borderWidth:2
    
  },
  main:{
    marginBottom:100
  }
 });





 {/* <Text  style={styles.Texts}>Enter Mobile :</Text>
            <TextInput
              style={styles.input}
              maxLength={13}
              placeholder="9918745589"
              keyboardType="phone-pad"
              // value={phone}
              // onChangeText={number => setPhone(number)}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {(errors.phone && touched.phone) && 
              <Text style={styles.ErrorText}>{errors.phone}</Text>
            } */}



            {/* <Text  style={styles.Texts}>Enter E-mail :</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              placeholder="YashDubey.Official@gemail.com"
              keyboardType="email-address"
              // value={email}
              // onChangeText={text => setEmail(text)}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {(errors.email && touched.email) && 
              <Text style={styles.ErrorText}>{errors.email}</Text>
            }


            <Text  style={styles.Texts}>Enter Password :</Text>
            <TextInput
              style={styles.input}
              placeholder="Yash@123#"
              keyboardType="default"
              secureTextEntry
              // onChangeText={text => setPassword(text)}
              // value={password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {(errors.password && touched.password) && 
              <Text style={styles.ErrorText}>{errors.password}</Text>
            } */}






// import {View, Text, TouchableOpacity} from 'react-native';
// import React from 'react';
// import auth from '@react-native-firebase/auth';
// import PhoneInput from 'react-native-phone-number-input';
// import Chat from '../Container/chat';
// import AllUsers from '../Container/allUsers';
// import { firebase } from '@react-native-firebase/database';
// import uuid from 'react-native-uuid'
// import { useDispatch, useSelector } from 'react-redux';
// import SimpleToast from 'react-native-simple-toast';
// import {setUser} from '../redux/reducer/user'

// const Profile = props => {
//   const createUser = async () => {
//     const usersData = {
//       id: uuid.v4(),
//       Name: Name,
//       phoneNumber: props.route.params.phoneNumber,
//     };
//     const newReference = firebase.database().ref('/users/' + usersData.id);
//     //Creating refernce in rnFirebase
//     newReference
//       .set(usersData)
//       .then(() => console.log('Data updated.'))
//       .then(() => dispatch(setUser(usersData)));
//     // .then(() => navigation.navigate('Chat'));
//   };
//   return (
//     <View>
//       <View style={{flexDirection: 'row', marginRight: 50}}>
//         <Text
//           style={{
//             marginRight: 60,
//             marginTop: 15,
//             fontWeight: 'bold',
//             fontSize: 20,
//             color: '#000',
//           }}>
//           Name :
//         </Text>
//         <TextInput
//           onChangeText={text => setName(text)}
//           value={values.Name}
//           placeholder="Enter Your Name"
//           withShadow
//           autoFocus
//         />
//       </View>
//       <TouchableOpacity onPress={()=>navigation.navigate('AllUsers')}>
//       <Text>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Profile;
