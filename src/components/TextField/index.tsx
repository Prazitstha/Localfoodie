import React, {useState} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {COLORS} from '../../constants/theme';

interface TextFieldProps {
  maxLength?: number;
  value?: string;
  placeHolder: string;
  numberOfLines?: number;
  autoFocus?: boolean;
  isSecureText?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'decimal-pad';
  onChangeText?: (text: string) => void;
  labelStyles?: StyleProp<TextStyle>;
  inputWrapperStyles?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const TextField = ({
  maxLength,
  numberOfLines = 1,
  autoCapitalize = 'sentences',
  value = '',
  placeHolder = 'Enter Username',
  autoFocus = false,
  isSecureText = false,
  keyboardType = 'default',
  labelStyles,
  inputWrapperStyles,
  containerStyles,
  onChangeText = (text: string) => {},
}: TextFieldProps) => {
  const [hideText, setHideText] = useState(isSecureText);

  return (
    <View style={[styles.container, containerStyles]}>
      <TextInput
        mode="outlined"
        label={placeHolder}
        value={value}
        autoCapitalize={autoCapitalize}
        secureTextEntry={hideText}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoFocus={autoFocus}
        style={[styles.input, inputWrapperStyles]}
        theme={{
          colors: {
            primary: COLORS.black,
            placeholder: COLORS.grey,
            text: COLORS.black,
          },
          roundness: 8,
        }}
        right={
          isSecureText ? (
            <TextInput.Icon
              icon={hideText ? 'eye-off' : 'eye'}
              onPress={() => setHideText(!hideText)}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontSize: 18,
    backgroundColor: COLORS.lgrey,
  },
});
