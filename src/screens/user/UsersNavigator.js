import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from './UserList';
import UserDetail from './UserDetail';

const Stack = createStackNavigator();
export default function UsersNavigator({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="UserList">
      <Stack.Screen name="UserList" animation="spring" component={UserList} />
      <Stack.Screen
        name="UserDetail"
        animation="spring"
        component={UserDetail}
      />
    </Stack.Navigator>
  );
}
