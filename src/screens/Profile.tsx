import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProfileScreenNavigationProp} from '@all/types/NavigationTypes';
import {
  ArrowLeft,
  MessageSquare,
  MoreVertical,
  Phone,
  Video,
} from 'react-native-feather';
import {useAppDispatch, useAppSelector} from '@all/hooks';
import {getUser, setUser} from '@all/slices';
import {dummySharedFiles} from '@all/constants';
import {firebaseAuth} from '@all/config/firebase.config';

const Profile = ({navigation}: ProfileScreenNavigationProp) => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(setUser(null));
      navigation.replace('Login');
    });
  };
  return (
    <SafeAreaView className="flex-1">
      {/* Top icons */}
      <View className="flex-row items-center justify-between px-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft stroke="#555" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MoreVertical stroke="#555" />
        </TouchableOpacity>
      </View>
      {/* Profile details */}
      <View className="items-center justify-center">
        <View className="w-24 h-24 p-1 mt-5 rounded-full border-2 border-primary relative">
          <Image
            source={{uri: user.profilePic}}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>
        <Text className="text-xl font-semibold text-primaryBold mt-3">
          {user.fullname}
        </Text>
        <Text className="text-sm font-semibold text-primaryText">
          {user.providerData.email}
        </Text>
      </View>
      {/* Icons  */}
      <View className="flex-row items-center justify-evenly py-5">
        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <MessageSquare stroke="#555" />
          </TouchableOpacity>
          <Text className="text-sm text-primaryText py-1">Message</Text>
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <Video stroke="#555" />
          </TouchableOpacity>
          <Text className="text-sm text-primaryText py-1">Video</Text>
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <Phone stroke="#555" />
          </TouchableOpacity>
          <Text className="text-sm text-primaryText py-1">Call</Text>
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-300">
            <MoreVertical stroke="#555" />
          </TouchableOpacity>
          <Text className="text-sm text-primaryText py-1">More</Text>
        </View>
      </View>
      {/* Media shared */}
      <View className="px-6 space-y-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-primaryText">
            Media Shared
          </Text>
          <TouchableOpacity>
            <Text className="text-base font-semibold uppercase text-primaryText">
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-between">
          {dummySharedFiles.map((file, idx) =>
            idx <= 2 ? (
              <TouchableOpacity
                key={idx}
                className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden">
                <Image
                  source={{uri: file}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {idx === 2 && (
                  <View className="absolute w-full h-full items-center justify-center bg-[#00000068]">
                    <Text className="text-lg font-semibold text-white">
                      {dummySharedFiles.length - 1}+
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : null,
          )}
        </View>
      </View>
      {/* Settings options */}
      <View className="flex-1 py-5 items-center justify-end">
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-lg text-primary font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
