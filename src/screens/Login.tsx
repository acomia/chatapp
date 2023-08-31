import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {LoginBG, LoginLogo, facebook, google} from '@all/assets';
import {UserInput} from '@all/components';
import {LoginScreenNavigationProp} from '@all/types/NavigationTypes';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {firebaseAuth, firestoreDB} from '@all/config/firebase.config';
import {doc, getDoc} from 'firebase/firestore';
import {useAppDispatch} from '@all/hooks';
import {setUser} from '@all/slices';

const Login = ({navigation}: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (emailValidationStatus && email !== '') {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(userCred => {
          if (userCred) {
            getDoc(doc(firestoreDB, 'users', userCred.user.uid)).then(
              docSnap => {
                if (docSnap.exists()) {
                  dispatch(setUser(docSnap.data()));
                }
              },
            );
          }
        })
        .catch(error => {
          console.log(error);
          if (error.message.includes('wrong-password')) {
            setHasError(true);
            setErrorMessage('Password is incorrect!');
          }
          if (error.message.includes('user-not-found')) {
            setHasError(true);
            setErrorMessage('User does not exist!');
          }
          setTimeout(() => {
            setHasError(false);
          }, 2000);
        });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={LoginBG}
        className="h-96 rounded-bl-[50px] rounded-br-[50px]"
        resizeMode="cover"
        style={{width: wp(100)}}
      />
      {/* Main */}
      <View
        className="flex items-center -mt-52 bg-white border-gray-200 border-2 shadow rounded-2xl px-4 mx-5"
        style={{height: hp(60)}}>
        <Image
          source={LoginLogo}
          className="w-10 h-10 mt-5 mb-2"
          resizeMode="contain"
        />
        <Text className="font-bold text-lg mb-10">Welcome Back</Text>
        {/* Error message */}
        {hasError && (
          <Text className="text-sm text-red-500 font-semibold">
            {errorMessage}
          </Text>
        )}
        <UserInput
          placeholder="Email"
          onValueChange={setEmail}
          setEmailValidationStatus={setEmailValidationStatus}
        />
        <UserInput
          placeholder="Password"
          isPassword
          onValueChange={setPassword}
        />
        {/* Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="flex w-full justify-center items-center p-3 mt-4 rounded-2xl bg-green-800">
          <Text className="font-semibold text-base text-white">Login</Text>
        </TouchableOpacity>
        {/* Social Media's */}
        <View className="flex flex-row items-center space-x-7 px8 mt-5">
          <View className="border border-gray-300 flex-1" />
          <Text className="font-bold">OR</Text>
          <View className="border border-gray-300 flex-1" />
        </View>
        <View className="flex flex-row items-center space-x-5 px8 mt-5">
          <TouchableOpacity className="border border-gray-300 rounded-full p-1 items-center justify-center">
            <Image source={facebook} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 rounded-full p-1 items-center justify-center">
            <Image source={google} className="w-6 h-6" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <View className="flex-row py-10 items-center justify-center space-x-1">
        <Text className="text-base">Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-base font-semibold text-green-800">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
