import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';

const FilterCategoryCards = ({item, state, setState}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setState({
          ...state,
          selectedCategory: item,
        });
      }}
      style={
        state?.selectedCategory === item
          ? styles.containerHightLight
          : styles.container
      }>
      <Text
        style={
          state?.selectedCategory === item ? styles.textHighLight : styles.text
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterCategoryCards;

const styles = StyleSheet.create({
  containerHightLight: {
    flexGrow: 1,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // height: Sizes.hp('5%'),
    borderColor: Colors.borderColor,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // height: Sizes.hp('5%'),
    borderColor: Colors.borderColor,
  },
  textHighLight: {
    color: Colors.white,
    fontSize: Sizes.hp('2%'),
    textAlign: 'center',
  },
  text: {
    color: Colors.SECONDRY,
    fontSize: Sizes.hp('2%'),
    textAlign: 'center',
  },
});
