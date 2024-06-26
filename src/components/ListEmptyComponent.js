import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

const ListEmptyComponent = ({text = 'No Data to show'}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '600',
          opacity: 0.5,
          color: Colors.TEXT1,
          textAlign: 'center',
          marginTop: 20,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
