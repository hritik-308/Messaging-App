import React, {useState, useEffect} from 'react';
import LoginScreen from '../Auth/PhoneAuth';
import Chat from '../Container/chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllUsers from '../Container/allUsers';
import Profile from '../Profile/Profile';
import GroupChat from '../Container/GroupChat';
import ChatList from '../Container/ChatList';
import Groups from '../Container/Groups';
import GrpMessages from '../Container/GrpMessages';
import AddGroupUsr from '../Container/AddGroupUsr';
import Ibutton from '../components/Chat/Ibutton';
import LastMessage from '../components/Chat/LastMessage';
import SendImg from '../components/Chat/SendImg';
import { useSelector } from 'react-redux';
import { setUser } from '../redux/reducer/user';
const Stack = createNativeStackNavigator();
export default function StackNavigation() {

  const currUser= useSelector(state=>state.User)
  console.log('currUser--->',currUser.login)

  if(!currUser.login){
    return (
  
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
         
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
      
      </Stack.Navigator>
    );
  }else{
  
  return (
  
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
         
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{headerShown: false}}
        />
      <Stack.Screen
        name="AllUsers"
        component={AllUsers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{headerShown: true, headerStyle: {backgroundColor: '#2994FF'}}}
      />
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GrpMessages"
        component={GrpMessages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddGroupUsr"
        component={AddGroupUsr}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ibutton"
        component={Ibutton}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LastMessage"
        component={LastMessage}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="SendImg"
        component={SendImg}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
    }
}
