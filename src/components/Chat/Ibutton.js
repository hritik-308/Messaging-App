import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import {ItemClick} from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import {FlatList} from 'native-base';
import {parseZone} from 'moment';
import {useSelector} from 'react-redux';

const Ibutton = props => {
  const [GrpImg, setGrpImg] = useState([])
  const navigation = props.navigation;
  // const image=props.route.params.Images.map(it=>(console.log('item---->',it)));
  // console.log(image)
  useEffect(() => {
    readData();
  }, []);

  const ImgData = useSelector(state => state.image.imageData.path);
  // setGrpImg(...GrpImg,ImgData)
  console.log('images', props.route.params.Images);

  //   console.log('props', props.route.params.groupId);
  const [group, setGroup] = useState();
  const [length, setLength] = useState();

  const readData = () => {
    firebase
      .database()
      .ref('/Groups/')
      .once('value')
      .then(snapshot => {
        Object.values(
          snapshot.val(snapshot.val(Object.values(snapshot.val()))),
        ).map(it => {
          if (props.route.params.groupId == it.groupId) {
            setGroup(it.users);
            setLength(it.users.length);
          }
        });
      });
  };

  const renderItem = ({item}, navigation) => {
    // console.log('groupData===---909090',item)

    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <View
            style={{
              marginLeft: 20,
              borderRadius: 100,
            }}>
            <Image
              source={{
                uri: 'https://media.gettyimages.com/photos/tesla-ceo-elon-musk-speaks-during-the-unveiling-of-the-new-tesla-y-picture-id1130598318?s=2048x2048',
              }}
              style={{
                justifyContent: 'flex-start',
                height: 50,
                width: 50,
                borderRadius: 100,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllUsers');
            }}>
            <View style={{marginLeft: 40}}>
              <Text style={{fontWeight: 'bold'}}>{item.Name}</Text>
              {/* <View>
              <Text style={{color: '#000'}}>{chlist()}</Text>
            </View> */}
            </View>
            <View
              style={{marginLeft: 250, flexDirection: 'row', marginTop: -15}}>
              <Image source={require('../../../Assets/msgLogo.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Image source={{uri: item.Images}} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: 11, marginTop: 5}}
            onPress={() => props.navigation.goBack()}>
            <Image source={require('../../../Assets/leftarrow.png')} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 100,
            }}>
            <Text style={{color: '#2994FF', fontSize: 20, fontWeight: '50'}}>
              {length} Members
            </Text>
          </View>
        </View>
        <Image
          style={{marginTop: 20, marginLeft: 20}}
          source={require('../../../Assets/Line.png')}
        />
      </View>
      <FlatList
        data={group}
        renderItem={item => renderItem(item, navigation)}
      />
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Images</Text>
        </View>
        {/* {ImgData.map(item => {
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
                        source={{uri: item}}
                      />
                    );
                  })} */}
        <Image
          style={{
            borderRadius: 2,
            borderColor: '#000',
            borderWidth: 1,
            width: 100,
            height: 100,
          }}
          source={{uri: ImgData}}
        />
      </View>
    </View>
  );
};

export default Ibutton;
