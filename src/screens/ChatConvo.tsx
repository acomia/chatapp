import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {ChatConvoScreenNavigationProp} from '@all/types/NavigationTypes';
import {
  ArrowLeft,
  Mic,
  MoreVertical,
  Phone,
  Send,
  Smile,
  Users,
  Video,
} from 'react-native-feather';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import {useAppSelector} from '@all/hooks';
import {getUser} from '@all/slices';
import {firestoreDB} from '@all/config/firebase.config';

const ChatConvo = ({navigation, route}: ChatConvoScreenNavigationProp) => {
  const user = useAppSelector(getUser);
  const {chat} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [showTimeStamp, setShowTimeStamp] = useState<any>(null);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const msgQuery = query(
      collection(firestoreDB, 'chats', chat?._id, 'messages'),
      orderBy('timeStamp', 'asc'),
    );

    const unsubscribe = onSnapshot(msgQuery, querySnap => {
      const updMessage = querySnap.docs.map(doc => doc.data());
      setMessages(updMessage);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleKeyboardOpen = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleSendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      roomId: chat._id,
      timeStamp: timeStamp,
      message: message,
      user: user,
    };
    setMessage('');
    await addDoc(
      collection(doc(firestoreDB, 'chats', chat._id), 'messages'),
      _doc,
    )
      .then(() => {})
      .catch(err => {
        console.log('Error: ', err);
      });
  };

  return (
    <View className="flex-1">
      <View className="w-full bg-primary px-4 py-6 flex-[0.2]">
        <View className="flex-row items-center justify-between py-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft stroke={'white'} />
          </TouchableOpacity>
          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white items-center justify-center">
              <Users stroke={'white'} />
            </View>
            <View>
              <Text className="text-gray-50 text-base font-semibold capitalize">
                {chat?.user?.fullname}
              </Text>
              <Text className="text-gray-100 text-sm font-semibold capitalize">
                online
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-center space-x-3">
            <TouchableOpacity>
              <Video stroke="white" fill="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Phone stroke="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MoreVertical stroke="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1 -mt-10 bg-white rounded-t-[45px] px-4 py-6">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={160}>
          <>
            <ScrollView
              contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
              {isLoading ? (
                <ActivityIndicator size={'large'} color="#28A745" />
              ) : (
                messages.map((msg, i) =>
                  msg.user.providerData.email === user.providerData.email ? (
                    <TouchableOpacity
                      onPress={() => setShowTimeStamp(i)}
                      className="m-1"
                      key={i}>
                      <View
                        style={{alignSelf: 'flex-end'}}
                        className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary w-auto">
                        <Text className="text-white text-base font-medium">
                          {msg.message}
                        </Text>
                      </View>
                      {showTimeStamp === i && (
                        <View style={{alignSelf: 'flex-end'}}>
                          {msg.timeStamp && msg.timeStamp.seconds && (
                            <Text className=" text-xs font-medium">
                              {new Date(
                                parseInt(msg.timeStamp.seconds) * 1000,
                              ).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              })}
                            </Text>
                          )}
                        </View>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setShowTimeStamp(i)}
                      className="flex items-center justify-start space-x-2 m-1"
                      style={{alignSelf: 'flex-start'}}>
                      <View className="flex-row items-center justify-center space-x-2">
                        <Image
                          className="w-12 h-12 rounded-full"
                          source={{uri: msg.user.profilePic}}
                          resizeMode="cover"
                        />
                        <View>
                          <View className="px-4 py-2 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-gray-200 w-auto">
                            <Text className="text-black text-base font-medium">
                              {msg.message}
                            </Text>
                          </View>
                          {showTimeStamp === i && (
                            <View>
                              {msg.timeStamp && msg.timeStamp.seconds && (
                                <Text className=" text-xs font-medium">
                                  {new Date(
                                    parseInt(msg.timeStamp.seconds) * 1000,
                                  ).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                  })}
                                </Text>
                              )}
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ),
                )
              )}
            </ScrollView>
            {/* Chat textinput */}
            <View className="flex-row items-center justify-between px-6">
              <View className="bg-gray-200 rounded-2xl px-4 py-2 mr-3 space-x-4 flex-row items-center justify-between">
                <TouchableOpacity onPress={handleKeyboardOpen}>
                  <Smile stroke="#555" />
                </TouchableOpacity>
                <TextInput
                  ref={textInputRef}
                  className="flex-1 h-8 text-sm text-primaryText font-semibold"
                  placeholder="Type here.."
                  placeholderTextColor="#999"
                  value={message}
                  onChangeText={val => setMessage(val)}
                />
                <TouchableOpacity>
                  <Mic stroke="#28A745" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleSendMessage}>
                <Send stroke="#555" />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ChatConvo;
