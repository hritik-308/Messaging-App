import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import AllUsers from './allUsers';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import MsgComponent from '../components/Chat/MsgComponent';
import {COLORS} from '../components/constants/colors';
import {Center, Icon} from 'native-base';
import moment from 'moment';
import ChatHeader from '../components/Header/ChatHeader';
import SimpleToast from 'react-native-simple-toast';
import {lstmsg} from '../redux/reducer/user';
import {Moment} from 'moment';
import ImagePicker from 'react-native-image-crop-picker';

const Chat = (props, {navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const {receiverData} = props.route.params;
  const {lstms} = receiverData.lastMsg;
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const [msg, setMsg] = React.useState('');
  const [time,setTime]=useState()
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);
  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

  // console.log('Day of message==>',moment(receiverData.sendTime).format('dddd'))

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
      console.log('Response', response);
      // setImage(image.path);
      response.map(Images => {
        // console.log(Images.path)

        imageList.push({
          path: Images.path,
        });
      });
      setImage(imageList);
    });
  };



  useEffect(() => {
    const onChildAdd = firebase
      .database()
      .ref('/messages/' + receiverData.roomId)
      .on('child_added', snapshot => {
        setallChat(state => [snapshot.val(), ...state]);
        setTime(snapshot.val().sendTime)
      });
    return () =>
      firebase
        .database()
        .ref('/messages' + receiverData.roomId)
        .off('child_added', onChildAdd);
  }, []);

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMsg = () => {
    if (msg == '' || msgvalid(msg) == 0) {
      SimpleToast.show('Enter something....');
      return false;
    }
    setdisabled(true);
    let msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'text',
      senderName: userData.Name,
      Images: image,
    };

    const newReference = firebase
      .database()
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      firebase
        .database()
        .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
        .update(chatListupdate);

      console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData);
      firebase
        .database()
        .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
        .update(chatListupdate);

      setMsg('');
      setImage([]);
      setdisabled(false);
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 500);
  }, []);

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
          <Image
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#000',
              borderRadius: 50,
              marginLeft: 10,
            }}
            source={{
              uri: 'https://media.gettyimages.com/photos/tesla-ceo-elon-musk-speaks-during-the-unveiling-of-the-new-tesla-y-picture-id1130598318?s=2048x2048',
            }}
          />
          <Text style={{fontWeight: '800', fontSize: 20, marginTop: 3}}>
            {receiverData.Name}
          </Text>
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <Image source={require('../../Assets/Vector.png')} />
        </TouchableOpacity>
      </View>
      <Image
        style={{marginTop: 5, marginLeft: 20}}
        source={require('../../Assets/Line.png')}
      />
      <View style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>{moment(receiverData.sendTime).format('dddd')}</Text>
        </View>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <>
                <MsgComponent sender={item.from == userData.id} item={item} />
              </>
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
                          height: 200,
                          width: 200,
                          backgroundColor: 'red',
                          borderColor: 'dodgerblue',
                          marginVertical: 15,
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

export default Chat;

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
