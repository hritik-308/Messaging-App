import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import MsgComponent from '../components/Chat/MsgComponent';
import {COLORS} from '../components/constants/colors';
import {Center, Hidden, Icon, ScrollView} from 'native-base';         
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {storage} from '@react-native-firebase/storage';
import { setImages } from '../redux/reducer/image';

const GrpMessages = (props, {navigation}) => {
  // console.log(props.route.params.gId)

  const dispatch = useDispatch();

  const {userData} = useSelector(state => state.User);

  const [msg, setMsg] = React.useState('');
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState();
  const[Path,setPath]=useState();

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
    });
  };

  const choosePhotoFromLibrary = () => {
    const imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      maxFiles: 10,
      mediaType: 'any',
      includeBase64: true,
    }).then(response => {
      // console.log('Response', JSON.stringify( response));
      response.map(Images => {
        imageList.push({
          path: Images.path,
        });
        // setPath(Images.path)
      });
      setImage(imageList);
      const strg=(imageList.map(item=> {return item.path}))
     const Storage=imageList.map(it=> {return it })
      dispatch(setImages(...Storage))
      console.log('storage',...Storage);
      const uploadTask = firebase.storage()
        .ref()
        .child(`/UploadedImages/${Date.now()}`)
        .putFile(...strg)
        uploadTask.on(
          'state_changed',
          snapshot => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         });
         let GroupImgs=image.map(it=>(it.path))
         const AddImage=firebase.database()
         .ref("/Groups/")
         .once('value')
      .then(snapshot => {
        // console.log('User data: ', Object.keys((snapshot.val())));
        Object.keys((snapshot.val())).map(item=>{if(item===props.route.params.gId){
          firebase.database()
         .ref(`/Groups/${props.route.params.gId}` )
         .update({GroupImg:[GroupImgs,...image.map(it=>(it.path))]})
         console.log('hii=====<><><>',image.map(it=>(it.path)))
        //  dispatch(setImages(...image.map(it=>(it.path))))

        }} )

          });

    });
  };
  // console.log('images--->', image);
  useEffect(() => {
    const onChildAdd = firebase
      .database()
      .ref('/messages/' + props.route.params.RoomId)
      .on('child_added', snapshot => {
        console.log('DB data=====>',snapshot.val())
        // console.log('A new node has been added', Object.values(snapshot.val(snapshot.val())).map(item=>(item.Images)));
        setallChat(state => [snapshot.val(), ...state]);
        setTime(snapshot.val().sendTime);
        // setAllImages(state=>[snapshot.val(),...state]);
      });
    // Stop listening for updates when no longer required
    return () =>
      firebase
        .database()
        .ref('/messages' + props.route.params.RoomId)
        .off('child_added', onChildAdd);
  }, []);

  const msgvalid = txt => txt && (txt.replace(/\s/g, '')).length;

  const sendMsg = () => {
    console.log(image)
     if (image.length===0 && msgvalid(msg) == 0 ) {
      SimpleToast.show('Enter something....');
      // return false;
    }else{
    setdisabled(true);
    let msgData = {
      roomId: props.route.params.RoomId,
      message: msg,
      from: userData?.id,
      sendTime: moment().format(''),
      msgType: 'text',
      senderName: userData.Name,
      Images: image,
    };
    const newReference = firebase
      .database()
      .ref('/messages/' + props.route.params.RoomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      firebase
        .database()
        .ref('/chatlist/' + props.route.params?.gId + '/' + userData?.id)
        .update(chatListupdate);
      firebase
        .database()
        .ref('/chatlist/' + userData?.id + props.route.params?.gId)
        .update(chatListupdate);

      setMsg('');
      setImage([]);
      setdisabled(false);
    });
  }
}
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  });
    
  // console.log(moment(time).format('dddd'))

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color="#2994FF" />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginLeft: -20}}
              onPress={() => props.navigation.goBack()}>
              <Image source={require('../../Assets/leftarrow.png')} />
            </TouchableOpacity>
            <View style={{flexDirection: 'column', marginTop: -25}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 34,
                    width: 34,
                    backgroundColor: '#000',
                    borderRadius: 30,
                    marginLeft: 10,
                  }}
                  source={{
                    uri: 'https://media.gettyimages.com/photos/tesla-ceo-elon-musk-speaks-during-the-unveiling-of-the-new-tesla-y-picture-id1130598318?s=2048x2048',
                  }}
                />
              </View>
              <Text style={{fontWeight: '800', fontSize: 20, marginTop: 0}}>
                {props.route.params.groupName}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Ibutton', {
                  groupId: props.route.params.gId,
                  Images:image
                })
              }>
                
              <Image source={require('../../Assets/Vector.png')} />
            </TouchableOpacity>
          </View>
          <Image
            style={{marginTop: 2, marginLeft: 20}}
            source={require('../../Assets/Line.png')}
          />
          <View style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>{moment(time).format('dddd')}</Text>
            </View>
            <FlatList
              style={{flex: 1}}
              setLoading={false}
              data={allChat}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              inverted
              renderItem={({item}) => {
                return (
                  <MsgComponent sender={item.from == userData.id} item={item} />
                );
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={styles.TinputView}>
              <ScrollView horizontal={true}>
                <View style={{flexDirection: 'row', padding: 20}}>
                  {image.map(item => {
                    // console.log('lkdnfgne----',item.path)
                    return (
                      <Image
                        style={{
                          height: 120,
                          width: 120,
                          backgroundColor: 'red',
                          borderColor: 'dodgerblue',
                          marginVertical: 15,
                          marginLeft:8
                        }}
                        source={{uri: item.path}}
                      />
                    );
                  })}
                </View>
              </ScrollView>

              <TextInput
                style={styles.Tinput}
                placeholder="type a message"
                placeholderTextColor={COLORS.black}
                multiline={true}
                value={msg}
                onChangeText={val => setMsg(val)}
              />
            </View>
            <View
              style={{
                backgroundColor: '#2994FF',
                marginTop: 8,
                marginLeft:25,
                height: 40,
                width: 40,
                left: 300,
                position: 'absolute',
                borderRadius: 5,
              }}>
              <TouchableOpacity
                disabled={disabled}
                onPress={choosePhotoFromLibrary}>
                <Image
                  source={require('../../Assets/camera.png')}
                  style={{
                    position: 'absolute',
                    left: '8.33%',
                    right: '8.33%',
                    top: '8.33%',
                    bottom: '8.33%',
                    marginTop: 12,
                    marginLeft: 7,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: '#2994FF',
                marginLeft:25,
                marginTop: 55,
                height: 40,
                width: 40,
                left: 300,
                position: 'absolute',
                borderRadius: 5,
              }}>
              <TouchableOpacity disabled={disabled} onPress={sendMsg}>
                <Image
                  source={require('../../Assets/msg.png')}
                  style={{
                    position: 'absolute',
                    left: '8.33%',
                    right: '8.33%',
                    top: '8.33%',
                    bottom: '8.33%',
                    marginTop: 12,
                    marginLeft: 7,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default GrpMessages;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Tinput: {
    backgroundColor: '#f3f2f3',
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '77%',
    borderColor: '#707070',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  TinputView: {
    backgroundColor: '#f3f2f3',
    overflow: 'hidden',
    // backgroundColor:'blue',
    // alignItems: 'center',
    flexDirection: 'column',
    // height: 90,
    width: '77%',
    borderRadius: 6,
    borderColor: '#707070',
    marginHorizontal: 10,
    marginVertical: 2,
    borderWidth: 1,
  },
});
