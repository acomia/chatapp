import React, {useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';

import {LoginLogo} from '@all/assets';
import {SplashScreenNavigationProp} from '@all/types/NavigationTypes';
import {useAppDispatch} from '@all/hooks';
import {setUser} from '@all/slices';
import {firebaseAuth, firestoreDB} from '@all/config/firebase.config';
import {doc, getDoc} from 'firebase/firestore';

const Splash = ({navigation}: SplashScreenNavigationProp) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkedLoggedUser();
  }, []);

  const checkedLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged(userCred => {
      if (userCred?.uid) {
        getDoc(doc(firestoreDB, 'users', userCred?.uid))
          .then(docSnap => {
            if (docSnap.exists()) {
              dispatch(setUser(docSnap.data()));
            }
          })
          .then(() => {
            setTimeout(() => {
              navigation.replace('Home');
            }, 2000);
          });
      } else {
        navigation.replace('Login');
      }
    });
  };

  return (
    <View className="flex-1 items-center justify-center space-y-5">
      <Image source={LoginLogo} className="w-12 h-12" resizeMode="contain" />
      <ActivityIndicator size={'large'} color="#28A745" />
    </View>
  );
};

export default Splash;
