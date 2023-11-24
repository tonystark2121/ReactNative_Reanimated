import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const App = () => {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View style={{height: 30, backgroundColor: 'red'}} />
        <View style={styles.root}>
          <Text style={styles.title}>
            Welcome to the React Native Reanimation Componets Screens
          </Text>
          <Animated.View style={{...styles.box, width}} />
          <View style={{marginVertical: 10, flexDirection: 'row', gap: 20}}>
            <Button title={'Press me'} onPress={handlePress} />
            <Button title="Reset" onPress={() => (width.value = 100)} />
          </View>
        </View>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  box: {
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 20,
  },
});
