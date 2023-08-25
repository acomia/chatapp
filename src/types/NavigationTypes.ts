// NavigationTypes.ts

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type LoginScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;