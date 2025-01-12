import {StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/loginReducer';

const MainStack: React.FC = () => {
  const [isLogin, setIslogin] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    getLoginDetails(); 
  });
  const getLoginDetails = async()=>{
    const user = await AsyncStorage.getItem('User');
    if(user){
      setIslogin(true);
      dispatch(setLogin({isLogin:true}))
    }
    else{
      setIslogin(false);
      dispatch(setLogin({isLogin:true}));
    }
  }
  return isLogin ? <AppStack/> : <AuthStack/>;
    
};

export default MainStack;

const styles = StyleSheet.create({});
