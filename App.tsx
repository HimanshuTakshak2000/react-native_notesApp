import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStack from './src/Navigation/MainStack';

function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
