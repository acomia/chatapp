import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Edit2} from 'react-native-feather';
import {BlurView} from '@react-native-community/blur';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import {LoginBG, LoginLogo, facebook, google} from '@all/assets';
import {UserInput} from '@all/components';
import {RegisterScreenNavigationProp} from '@all/types/NavigationTypes';
import {avatars} from '@all/constants';
import {firebaseAuth, firestoreDB} from '@all/config/firebase.config';
import {doc, setDoc} from 'firebase/firestore';

const Register = ({navigation}: RegisterScreenNavigationProp) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(avatars[0].image.asset.url);
  const [showAvatars, setShowAvatars] = useState(false);
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);

  const handleChangeAvatar = (item: any) => {
    setAvatar(item.image.asset.url);
    setShowAvatars(false);
  };

  const handleRegistration = async () => {
    if (emailValidationStatus && email !== '') {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        userCred => {
          const data = {
            _id: userCred.user.uid,
            fullname: fullname,
            profilePic: avatar,
            providerData: userCred.user.providerData[0],
          };

          setDoc(doc(firestoreDB, 'users', userCred.user.uid), data).then(
            () => {
              navigation.navigate('Login');
            },
          );
        },
      );
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
      {/* Avatar list */}
      {showAvatars && (
        <View
          className="absolute inset-0 z-10"
          style={{width: wp(100), height: hp(100)}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingVertical: 30}}>
            <BlurView
              blurType="light"
              blurAmount={10}
              style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingHorizontal: 4,
                paddingVertical: 16,
              }}>
              {avatars.map(item => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleChangeAvatar(item)}
                  className="w-20 h-20 m-3 p-1 border-2 border-primary rounded-full relative">
                  <Image
                    source={{uri: item.image.asset.url}}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </BlurView>
          </ScrollView>
        </View>
      )}
      {/* Main */}
      <View
        className="flex items-center -mt-52 bg-white border-gray-200 border-2 shadow rounded-2xl px-4  mx-5"
        style={{height: hp(65)}}>
        <Image
          source={LoginLogo}
          className="w-10 h-10 mt-5 mb-2"
          resizeMode="contain"
        />
        <Text className="font-bold text-lg mb-1">Registration</Text>
        {/* Avatar */}
        <View className="w-full flex items-center justify-center my-2">
          <TouchableOpacity
            onPress={() => setShowAvatars(true)}
            className="w-16 h-16 p-1 rounded-full border-2 border-primary relative">
            <Image
              source={{uri: avatar}}
              className="w-full h-full"
              resizeMode="contain"
            />
            <View className="absolute top-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Edit2 width={14} height={14} stroke={'white'} />
            </View>
          </TouchableOpacity>
        </View>
        <UserInput placeholder="Fullname" onValueChange={setFullname} />
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
          onPress={handleRegistration}
          className="flex w-full justify-center items-center p-3 mt-4 rounded-2xl bg-green-800">
          <Text className="font-semibold text-base text-white">Register</Text>
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
      <View className="py-10 flex-row items-center justify-center space-x-1">
        <Text className="text-base">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-base font-semibold text-green-800">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
