/* eslint-disable react-hooks/exhaustive-deps */
import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UsersNavigator from '../screens/user/UsersNavigator';

const Stack = createStackNavigator();

const Routes = ({}) => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <NavigationContainer
        theme={{
          colors: {
            background: '#fff',
          },
        }}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'UsersNavigator'} component={UsersNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
