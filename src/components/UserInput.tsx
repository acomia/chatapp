import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {User, Lock, Mail, Eye, EyeOff} from 'react-native-feather';

interface IUserInput {
  placeholder: string;
  isPassword?: boolean;
  onValueChange: (val: string) => void;
  setEmailValidationStatus?: (val: boolean) => void;
}

const UserInput = ({
  placeholder,
  isPassword,
  onValueChange,
  setEmailValidationStatus,
}: IUserInput) => {
  const [value, setValue] = useState('');
  const [showPw, setShowPw] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const renderInputIcon = () => {
    switch (placeholder) {
      case 'Email':
        return <Mail stroke="gray" width={20} height={20} />;
      case 'Password':
        return <Lock stroke="gray" width={20} height={20} />;
      case 'Fullname':
        return <User stroke="gray" width={20} height={20} />;
      default:
        return <Mail stroke="gray" width={20} height={20} />;
        break;
    }
  };

  const handleChangeText = (val: string) => {
    setValue(val);
    onValueChange(val);

    if (placeholder === 'Email') {
      const emailRegex = /^[^\s@]+@+[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setEmailValidationStatus(status);
    }
  };

  return (
    <View
      className={`flex-row items-center p-3 my-2 border-2 space-x-2 rounded-lg ${
        !isEmailValid && placeholder == 'Email' && value.length > 0
          ? 'border-danger'
          : 'border-gray-200'
      }`}>
      {renderInputIcon()}
      <TextInput
        className="flex-1 text-base font-medium -mt-1"
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={isPassword && showPw}
        onChangeText={handleChangeText}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPw(!showPw)}>
          {showPw ? (
            <Eye stroke="gray" width={20} height={20} />
          ) : (
            <EyeOff stroke="gray" width={20} height={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserInput;
