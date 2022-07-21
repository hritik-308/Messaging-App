import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import {ItemClick} from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import {FlatList} from 'native-base';

const Ibutton = props => {
  const navigation = props.navigation;
  console.log(navigation);
  useEffect(() => {
    readData();
  }, []);

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
            setGroup(it.usersData.users);
            setLength(it.usersData.users.length);
          }
        });
      });
  };

  const renderItem = ({item}, navigation) => {
    //   console.log('groupData===---909090',length)

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
    </View>
  );
};

export default Ibutton;
