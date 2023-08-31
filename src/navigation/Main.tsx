// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ChatConvo,
  Home,
  Login,
  NewChat,
  Profile,
  Register,
  Splash,
} from '@all/screens';
import {RootStackParamList} from '@all/types/NavigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewChat" component={NewChat} />
        <Stack.Screen name="ChatConvo" component={ChatConvo} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
