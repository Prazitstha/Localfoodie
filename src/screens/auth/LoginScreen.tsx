import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import React, {useState} from 'react';
import {TextField} from '../../components/TextField';
import {Button} from '../../components/Button';
import {useAppDispatch} from '@hooks/rtkHooks';
import {setIsLoggedIn} from '@redux/features/appSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      dispatch(setIsLoggedIn(true));
      setPassword('');
      setEmail('');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Let's Sign You In</Text>
            <Text style={styles.text}>Welcome back, you've been missed!</Text>
          </View>
          <View
            style={{alignItems: 'center', marginHorizontal: 16, marginTop: 32}}>
            <TextField
              value={email}
              placeHolder={'Email'}
              autoCapitalize={'none'}
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              containerStyles={{marginBottom: 12}}
            />
            <TextField
              isSecureText
              value={password}
              onChangeText={text => setPassword(text)}
              placeHolder={'Password'}
            />
            <Text style={styles.text2}>Forgot password?</Text>
            <Button
              isLoading={loading}
              disabled={email === '' || password === ''}
              label="Login"
              containerStyles={{
                marginTop: 24,
                backgroundColor: COLORS.lblack,
              }}
              textStyles={{color: 'white'}}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 8,
  },
  logoContainer: {
    display: 'flex',
    marginTop: 84,
    marginLeft: 16,
  },
  title: {
    fontSize: SIZES.xl,
    color: COLORS.black,
    lineHeight: 34,
    letterSpacing: -1,
  },
  text: {
    marginTop: 12,
    opacity: 0.8,
    fontSize: SIZES.md,
    color: COLORS.black,
    lineHeight: 21,
    letterSpacing: -0.4,
  },
  text2: {
    alignSelf: 'flex-end',
    fontSize: SIZES.sm,
    color: COLORS.lblack,
    marginTop: 12,
  },
  text3: {
    marginVertical: 16,
    fontSize: SIZES.sm,
    color: COLORS.grey2,
  },
  bottomText: {
    fontSize: SIZES.sm,
    color: COLORS.grey2,
  },
  lineButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderColor: COLORS.lwhite,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    height: 54,
    width: '100%',
  },
  lineLogo: {
    height: 30,
    width: 30,
  },
  buttonName: {
    fontSize: SIZES.md,
    color: COLORS.dblack,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  lineStyles: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.pale_blue,
    marginBottom: 12,
  },
});
