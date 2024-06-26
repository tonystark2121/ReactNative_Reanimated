import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Platform,
} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View style={{height: 30, backgroundColor: 'red'}} />

        <View style={styles.root}>
          <Text style={styles.title}>Hello World</Text>
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
  boxForMove: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 20,
  },
  ios_container: {
    height: Platform.OS === 'ios' ? 30 : 0,
    flex: Platform.OS === 'ios' ? 1 : 0,
  },
  android_continer: {
    height: 20,
    flex: 0,
  },
});
