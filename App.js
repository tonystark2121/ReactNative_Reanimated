import {StyleSheet, Text, View, StatusBar, Button} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';



const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const App = () => {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  const translateX = useSharedValue(0);

  const handlePressMoveRight = () => {
    translateX.value += 50;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value * 2)}],
  }));

  const r = useSharedValue(20);

  const handlePressCircle = () => {
    r.value += 10;
  };

  const animatedProps = useAnimatedProps(() => ({
    r: withTiming(r.value),
  }));

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View style={{height: 30, backgroundColor: 'red'}} />
        <View style={styles.root}>
          <Text style={styles.title}>
            Welcome to the React Native Reanimation Componets Screens
          </Text>

          <Text>Changing radius</Text>
          <Svg style={styles.svg}>
            <AnimatedCircle
              cx="50%"
              cy="50%"
              fill="#b58df1"
              animatedProps={animatedProps}
            />
          </Svg>
          <Button onPress={handlePressCircle} title="Click me" />

          <Text>Moving to right</Text>
          <Animated.View style={[styles.boxForMove, animatedStyles]} />
          <View style={{marginVertical: 10, flexDirection: 'row', gap: 20}}>
            <Button title={'Press me'} onPress={handlePressMoveRight} />
            <Button title="Reset" onPress={() => (translateX.value = 0)} />
          </View>

          <Text>Changing width</Text>
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
  boxForMove: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 20,
  },
});
