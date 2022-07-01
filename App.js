import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/authStackNav';
import LoginScreen from './src/Auth/PhoneAuth';
import Chat from './src/Container/chat';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    // // <LoginScreen/>
    // <Chat/>
  );
};

export default App;