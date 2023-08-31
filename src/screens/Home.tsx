import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useAppSelector} from '@all/hooks';
import {getUser} from '@all/slices';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginLogo} from '@all/assets';
import {MessageSquare, User} from 'react-native-feather';
import {MessageCard} from '@all/components';
import {HomeScreenNavigationProp} from '@all/types/NavigationTypes';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {firestoreDB} from '@all/config/firebase.config';

const Home = ({navigation}: HomeScreenNavigationProp) => {
  const user = useAppSelector(getUser);
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState(null);

  useEffect(() => {
    const chatQuery = query(
      collection(firestoreDB, 'chats'),
      orderBy('_id', 'desc'),
    );

    const unsubscribe = onSnapshot(chatQuery, querySnapShot => {
      const chatRooms = querySnapShot.docs.map(doc => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <View className="flex-1">
      <SafeAreaView>
        {/* Top section */}
        <View className="flex-row items-center justify-between px-4 py-2">
          <Image
            source={LoginLogo}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            className="w-12 h-12 rounded-full border border-primary items-center justify-center">
            <Image
              source={{uri: user?.profilePic}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-primaryText text-base font-bold">Messages</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
          <MessageSquare stroke={'gray'} fill={'gray'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color="#28A745" />
        ) : (
          <>
            {chats?.map(chat => (
              <MessageCard key={chat._id} chat={chat} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
