import React, {useState, useEffect} from 'react';
import LoginScreen from '../Auth/PhoneAuth';
import Chat from '../Container/chat';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllUsers from '../Container/allUsers';
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
      

    </Stack.Navigator>
  );
}