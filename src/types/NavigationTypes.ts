// NavigationTypes.ts

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  NewChat: undefined;
  ChatConvo: {
    chat: any
  };
  Profile: undefined
};

export type SplashScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type LoginScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type NewChatScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'NewChat'>;
export type ChatConvoScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ChatConvo'>;
export type ProfileScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Profile'>;