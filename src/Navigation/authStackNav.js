import React, {useState, useEffect} from 'react';
import LoginScreen from '../Auth/PhoneAuth';
import Chat from '../Container/chat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllUsers from '../Container/allUsers';
import Profile from '../Container/Profile/Profile';
import GroupChat from '../Container/GroupChat';
const Stack = createNativeStackNavigator();
export default function StackNavigation() {
  

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
    }}
    >
      
      <Stack.Screen name="AllUsers" component={AllUsers}  options={{headerShown:false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Chat" component={Chat}  options={{headerShown:false}} />
      <Stack.Screen name="Profile" component={Profile}  options={{headerShown:false}} />
      <Stack.Screen name="GroupChat" component={GroupChat}  options={{headerShown:false}} />
      
      

    </Stack.Navigator>
  );
}