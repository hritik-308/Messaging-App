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
import storage from '@react-native-firebase/storage';

const SendImg = () => {
  const [downloadurl, setDownloadurl] = useState(
    'https://reactjs.org/logo-og.png',
  );
  // const {data}=props
  //   console.log('hlw==========>>>>>>',data)

  //open library and upload pic to firebase
  const pickImageAndUpload = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      //    console.log(fileobj.assets[0].uri)
      const uploadTask = storage()
        .ref()
        .child(`/profilePictures/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert('image uploaded');
        },
        error => {
          alert('error uploading image', error);
        },
        //For fetching uploaded photo url
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            setDownloadurl(downloadURL);
          });
        },
      );
    });
  };

  return (
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
        source={{uri: downloadurl}}
      />

      <View style={styles.box2}>
        <TouchableOpacity style={styles.tco} onPress={()=>pickImageAndUpload()}>
                    <Image 
                      style={styles.cty}
                      source={require('../../../Assets/pluss.png')}/>
                </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendImg;

const styles = StyleSheet.create({
  box2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
  },
});
