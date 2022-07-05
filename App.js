import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/authStackNav';
import LoginScreen from './src/Auth/PhoneAuth';
import Chat from './src/Container/chat';
import ChatApp from './src/Container/Chatapp';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    // // <LoginScreen/>
    // <Chat/>
    // <ChatApp/>
  );
};

export default App;