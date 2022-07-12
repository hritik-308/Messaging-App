import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/authStackNav';
import LoginScreen from './src/Auth/PhoneAuth';
import Chat from './src/Container/chat';
import { NativeBaseProvider } from 'native-base';
import Profile from './src/Container/Profile/Profile';
import GroupChat from './src/Container/GroupChat';

const App = () => {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    </NativeBaseProvider>
    // <Profile/>
    // // <LoginScreen/>
    // <Chat/>
    // <GroupChat/>
    
  );
};

export default App;