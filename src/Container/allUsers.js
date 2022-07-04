import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox
} from 'react-native';

const data = [
  {
    id: 1,
    pic: require('../../Assets/user.png'),
    name: 'Benjamin',
    time: '12:34',
  },
  {
    id: 2,
    pic: require('../../Assets/user.png'),
    name: 'Harry',
    time: '12:34',
  },
  {
    id: 3,
    pic: require('../../Assets/user.png'),
    name: 'Joe',
    time: '12:34',
  },
  {
    id: 4,
    pic: require('../../Assets/user.png'),
    name: 'Benjamin Franklin',
    time: '12:34',
  },
  {
    id: 5,
    pic: require('../../Assets/user.png'),
    name: 'Jacob',
    time: '12:34',
  },
  {
    id: 6,
    pic: require('../../Assets/user.png'),
    name: 'Andrew',
    time: '12:34',
  },
  {
    id: 7,
    pic: require('../../Assets/user.png'),
    name: 'mitchell',
    time: '12:34',
  },
  {
    id: 8,
    pic: require('../../Assets/user.png'),
    name: 'steve',
    time: '12:34',
  },
  {
    id: 9,
    pic: require('../../Assets/user.png'),
    name: 'steve',
    time: '12:34',
  },
  {
    id: 10,
    pic: require('../../Assets/user.png'),
    name: 'william',
    time: '12:34',
  },
  {
    id: 11,
    pic: require('../../Assets/user.png'),
    name: 'jeff',
    time: '12:34',
  },
];
const AllUsers = ({navigation}) => {
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])
  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <View
          style={{
            marginLeft: 20,
            borderRadius: 80,
            borderWidth: 4,
            borderColor: '#2994FF',
          }}>
          <Image
            source={item.pic}
            style={{
              justifyContent: 'flex-start',
              height: 40,
              width: 40,
              borderRadius: 80,
              borderWidth: 5,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat', {Username: item.name})}>
          <View style={{marginLeft: 40}}>
            <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          </View>
          <View style={{marginLeft: 250, flexDirection: 'row'}}>
            <Text style={{color: '#000'}}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const [result, setResult] = useState('');
  return (
    <ScrollView>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
        <Text style={{color: '#2994FF', fontWeight: 'bold', fontSize: 30}}>
          Messages
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: '#f3f2f3',
            overflow: 'hidden',
            alignItems: 'center',
            flexDirection: 'row',
            height: 60,
            width: '77%',
            borderRadius: 6,
            backgroundColor: '#f2f3f2',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Image
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}
            source={require('../../Assets/search.png')}
          />
          <TextInput
            style={{flexWrap: 'wrap', flex: 1, borderWidth: 1}}
            placeholder="Search"
            value={result}
            onChangeText={setResult}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 7,
            marginTop: 22,
            backgroundColor: '#2994FF',
            width: 55,
            height: 55,
            borderRadius: 5,
          }}>
          <TouchableOpacity>
            <Image
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 20,
                width: 20,
                marginLeft: 18,
              }}
              source={require('../../Assets/+.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
      <FlatList
        nestedScrollEnabled
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      </View>
    </ScrollView>
  );
};

export default AllUsers;
