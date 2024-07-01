import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductCategories from './ProductCategories';
import ProductDetails from './ProductDetails';

const Stack = createStackNavigator();
export default function EcommerceNavigator({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ProductCategories">
      <Stack.Screen
        name="ProductCategories"
        animation="spring"
        component={ProductCategories}
      />
      <Stack.Screen
        name="ProductDetails"
        animation="spring"
        component={ProductDetails}
      />
    </Stack.Navigator>
  );
}
