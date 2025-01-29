import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screens/auth';

export type AuthStackParams = {
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParams>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
