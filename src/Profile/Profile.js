import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {launchImageLibrary} from 'react-native-image-picker';

import auth, {firebase, database} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import * as yup from 'yup';
import {Formik} from 'formik';
// import AllUsers from '../allUsers';
import ImagePicker from 'react-native-image-crop-picker'

export default function Profile({navigation}, props) {
  const [downloadurl, setDownloadurl] = useState(
    'https://reactjs.org/logo-og.png',
  );
  
  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
     
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  //open library and upload pic to firebase
  // const pickImageAndUpload = () => {
  //   launchImageLibrary({quality: 0.5}, fileobj => {
  //     //    console.log(fileobj.assets[0].uri)
  //     const uploadTask = storage()
  //       .ref()
  //       .child(`/profilePictures/${Date.now()}`)
  //       .putFile(fileobj.assets[0].uri);
  //     uploadTask.on(
  //       'state_changed',
  //       snapshot => {
  //         var progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         if (progress == 100) alert('image uploaded');
  //       },
  //       error => {
  //         alert('error uploading image', error);
  //       },
  //       //For fetching uploaded photo url
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
  //           setDownloadurl(downloadURL);
  //         });
  //       },
  //     );
  //   });
  // };

  //Form validation YUP Schema
  const loginValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'must be at least 3 characters long')
      .required('Name must be required'),
  });

  return (
  
        <ScrollView style={styles.main}>
          <View>


            <Image
              style={{
                height: 170,
                width: 170,
                borderWidth: 2,
                borderColor: 'dodgerblue',
                borderRadius: 85,
                marginHorizontal: 120,
                marginVertical: 15,
              }}
              source={{uri: image}}
            />

            <View style={styles.box2}>
              <TouchableOpacity
                style={styles.tco}
                onPress={() => pickImageAndUpload()}>
                {/* <Image 
                      style={styles.cty}
                      source={require('../../../Assets/pluss.png')}/> */}
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={takePhotoFromCamera}>
                  <Text style={styles.panelButtonTitle}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={choosePhotoFromLibrary}>
                  <Text style={styles.panelButtonTitle}>
                    Choose From Library
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={() => this.bs.current.snapTo(1)}>
                  <Text style={styles.panelButtonTitle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.Texts}>Name :{}</Text>
          {/* <Image source={require()}/> */}
        </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: 'dodgerblue',
    margin: 20,
  },

  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
  },
  input: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    padding: 11,
  },
  Texts: {
    marginTop: 10,
    marginLeft: 20,
    color: '#000',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64beff',
    padding: 10,
    width: 150,
    borderRadius: 50,
    marginTop: 40,
    marginLeft: 115,
  },
  ErrorText: {
    marginLeft: 20,
    marginTop: -10,
    color: 'red',
  },

  mod: {
    color: 'dodgerblue',
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tco: {
    flex: 1,
    color: 'dodgerblue',
  },
  cty: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    marginLeft: 140,
    // marginTop:30,
    bottom: 15,
    left: 60,
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: 'dodgerblue',
    borderWidth: 2,
  },
  main: {
    marginBottom: 100,
  },
});

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   TextInput,
//   StyleSheet,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

// import ImagePicker from 'react-native-image-crop-picker';

// const EditProfileScreen = () => {

//   const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');

//   const takePhotoFromCamera = () => {
//     ImagePicker.openCamera({
//       compressImageMaxWidth: 300,
//       compressImageMaxHeight: 300,
//       cropping: true,
//       compressImageQuality: 0.7
//     }).then(image => {
//       console.log(image);
//       setImage(image.path);
//       this.bs.current.snapTo(1);
//     });
//   }

//   const choosePhotoFromLibrary = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: true,
//       compressImageQuality: 0.7
//     }).then(image => {
//       console.log(image);
//       setImage(image.path);
//       this.bs.current.snapTo(1);
//     });
//   }

//   renderInner = () => (
//     <View style={styles.panel}>
//       <View style={{alignItems: 'center'}}>
//         <Text style={styles.panelTitle}>Upload Photo</Text>
//         <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
//       </View>
//       <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
//         <Text style={styles.panelButtonTitle}>Take Photo</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
//         <Text style={styles.panelButtonTitle}>Choose From Library</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.panelButton}
//         onPress={() => this.bs.current.snapTo(1)}>
//         <Text style={styles.panelButtonTitle}>Cancel</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   renderHeader = () => (
//     <View style={styles.header}>
//       <View style={styles.panelHeader}>
//         <View style={styles.panelHandle} />
//       </View>
//     </View>
//   );

//   bs = React.createRef();

//   return (
//     <View style={styles.container}>
//       <BottomSheet
//         ref={this.bs}
//         snapPoints={[330, 0]}
//         renderContent={this.renderInner}
//         renderHeader={this.renderHeader}
//         initialSnap={1}
//         callbackNode={this.fall}
//         enabledGestureInteraction={true}
//       />

//         <View style={{alignItems: 'center'}}>
//           <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
//             <View
//               style={{
//                 height: 100,
//                 width: 100,
//                 borderRadius: 15,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <ImageBackground
//                 source={{
//                   uri: image,
//                 }}
//                 style={{height: 100, width: 100}}
//                 imageStyle={{borderRadius: 15}}>
//                 <View
//                   style={{
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Icon
//                     name="camera"
//                     size={35}
//                     color="#fff"
//                     style={{
//                       opacity: 0.7,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       borderWidth: 1,
//                       borderColor: '#fff',
//                       borderRadius: 10,
//                     }}
//                   />
//                 </View>
//               </ImageBackground>
//             </View>
//           </TouchableOpacity>
//           <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
//             John Doe
//           </Text>
//         </View>

//         <View style={styles.action}>
//           <FontAwesome name="user-o" color={colors.text} size={20} />
//           <TextInput
//             placeholder="First Name"
//             placeholderTextColor="#666666"
//             autoCorrect={false}
//             style={[
//               styles.textInput,
//               {
//                 color: colors.text,
//               },
//             ]}
//           />
//         </View>
//         <View style={styles.action}>
//           <FontAwesome name="user-o" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Last Name"
//             placeholderTextColor="#666666"
//             autoCorrect={false}
//             style={[
//               styles.textInput,
//               {
//                 color: colors.text,
//               },
//             ]}
//           />
//         </View>
//         <View style={styles.action}>
//           <Feather name="phone" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Phone"
//             placeholderTextColor="#666666"
//             keyboardType="number-pad"
//             autoCorrect={false}
//             style={[
//               styles.textInput,
//               {
//                 color: colors.text,
//               },
//             ]}
//           />
//         </View>
//         <View style={styles.action}>
//           <FontAwesome name="envelope-o" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#666666"
//             keyboardType="email-address"
//             autoCorrect={false}
//             style={[
//               styles.textInput,
//               {
//                 color: colors.text,
//               },
//             ]}
//           />
//         </View>
//         <View style={styles.action}>
//           <FontAwesome name="globe" color={colors.text} size={20} />
//           <TextInput
//             placeholder="Country"
//             placeholderTextColor="#666666"
//             autoCorrect={false}
//             style={[
//               styles.textInput,
//               {
//                 color: colors.text,
//               },
//             ]}
//           />
//         </View>
//         <View style={styles.action}>
//           <Icon name="map-marker-outline" color={colors.text} size={20} />
//           <TextInput
//             placeholder="City"
//             placeholderTextColor="#666666"
//             autoCorrect={false}
//             style={[
//               styles.textInput,
//               {
//                 color: colors.text,
//               },
//             ]}
//           />
//         </View>
//         <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
//           <Text style={styles.panelButtonTitle}>Submit</Text>
//         </TouchableOpacity>

//     </View>
//   );
// };

// export default EditProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   commandButton: {
//     padding: 15,
//     borderRadius: 10,
//     backgroundColor: '#FF6347',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   panel: {
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//     paddingTop: 20,
//     // borderTopLeftRadius: 20,
//     // borderTopRightRadius: 20,
//     // shadowColor: '#000000',
//     // shadowOffset: {width: 0, height: 0},
//     // shadowRadius: 5,
//     // shadowOpacity: 0.4,
//   },
//   header: {
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#333333',
//     shadowOffset: {width: -1, height: -3},
//     shadowRadius: 2,
//     shadowOpacity: 0.4,
//     // elevation: 5,
//     paddingTop: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   panelHeader: {
//     alignItems: 'center',
//   },
//   panelHandle: {
//     width: 40,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#00000040',
//     marginBottom: 10,
//   },
//   panelTitle: {
//     fontSize: 27,
//     height: 35,
//   },
//   panelSubtitle: {
//     fontSize: 14,
//     color: 'gray',
//     height: 30,
//     marginBottom: 10,
//   },
//   panelButton: {
//     padding: 13,
//     borderRadius: 10,
//     backgroundColor: '#FF6347',
//     alignItems: 'center',
//     marginVertical: 7,
//   },
//   panelButtonTitle: {
//     fontSize: 17,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   action: {
//     flexDirection: 'row',
//     marginTop: 10,
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     paddingBottom: 5,
//   },
//   actionError: {
//     flexDirection: 'row',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#FF0000',
//     paddingBottom: 5,
//   },
//   textInput: {
//     flex: 1,
//     marginTop: Platform.OS === 'ios' ? 0 : -12,
//     paddingLeft: 10,
//     color: '#05375a',
//   },
// });
