
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainStack from './src/Navigation/MainStack';



function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}


export default App;
