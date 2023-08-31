import {
  HomeScreenNavigationProp,
  RootStackParamList,
} from '@all/types/NavigationTypes';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {User} from 'react-native-feather';

const MessageCard = ({chat}: any) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatConvo', {chat: chat})}
      className="flex-row items-center justify-between px-4 py-2 space-x-3">
      {/* user */}
      <View className="w-12 h-12 rounded-full border border-primary items-center justify-center">
        {/* <User stroke={'gray'} fill={'gray'} /> */}
        <Image
          source={{uri: chat?.user?.profilePic}}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      {/* chat content */}
      <View className="flex-1 flex items-start justify-center">
        <Text className="text-sm text-gray-700 font-bold capitalize">
          {chat?.user?.fullname}
        </Text>
        <Text className="text-xs text-gray-400 truncate ...">
          {chat?.chatDetails}
        </Text>
      </View>
      {/* time */}
      <Text className="text-primary font-semibold text-sm">30 mins</Text>
    </TouchableOpacity>
  );
};

export default MessageCard;
