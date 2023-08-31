import {LoginLogo} from '@all/assets';
import {firestoreDB} from '@all/config/firebase.config';
import {useAppSelector} from '@all/hooks';
import {getUser} from '@all/slices';
import {NewChatScreenNavigationProp} from '@all/types/NavigationTypes';
import {doc, setDoc} from 'firebase/firestore';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {ArrowLeft, MessageCircle, Send} from 'react-native-feather';

const NewChat = ({navigation}: NewChatScreenNavigationProp) => {
  const user = useAppSelector(getUser);
  const [chat, setChat] = useState('');

  const createNewChat = () => {
    let id = `${Date.now()}`;

    const _doc = {
      _id: id,
      user: user,
      chatDetails: chat,
    };

    if (chat !== '') {
      setDoc(doc(firestoreDB, 'chats', id), _doc)
        .then(() => {
          setChat('');
          navigation.replace('Home');
        })
        .catch(err => {
          console.log('Error: ', err);
        });
    }
  };

  return (
    <View className="flex-1">
      <View className="w-full bg-primary px-4 py-6 flex-[0.2]">
        <View className="flex-row items-center justify-between px-2 py-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft stroke={'white'} />
          </TouchableOpacity>
          <View className="w-12 h-12 rounded-full  items-center justify-center">
            <Image
              source={{uri: user?.profilePic}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <View className="flex-1 -mt-10 bg-white rounded-t-[45px] px-4 py-6">
        <View className="w-full flex-row items-center justify-between py-3 px-4 border border-gray-200 rounded-lg space-x-2">
          <MessageCircle stroke={'gray'} />
          <TextInput
            className="flex-1 text-base text-primaryText h-10 -mt-2"
            placeholder="Enter new chat"
            placeholderTextColor="#999"
            value={chat}
            onChangeText={val => setChat(val)}
          />
          <TouchableOpacity onPress={createNewChat}>
            <Send stroke={'gray'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewChat;
