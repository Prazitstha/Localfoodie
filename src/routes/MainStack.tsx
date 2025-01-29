import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@screens/home';
import TabNavigator from './TabNavigator';

type MainStackParams = {
  Home: undefined;
  Maintabs: undefined;
};

const Stack = createNativeStackNavigator<MainStackParams>();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'Maintabs'}
        component={TabNavigator}
      /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
