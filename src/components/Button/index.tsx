import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {SIZES} from '../../constants/theme';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  textStyles?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
}

export const Button = ({
  label = 'Submit',
  disabled = false,
  isLoading = false,
  onPress = () => {},
  textStyles,
  containerStyles,
}: ButtonProps) => {
  return (
    <PaperButton
      mode="contained"
      onPress={onPress}
      disabled={isLoading || disabled}
      style={[styles.buttonStyles, containerStyles]}
      contentStyle={styles.contentStyle}
      labelStyle={[styles.text, textStyles]}
      loading={isLoading}>
      {!isLoading && label}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    height: 56,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
  },
  contentStyle: {
    height: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: SIZES.md,
  },
});
