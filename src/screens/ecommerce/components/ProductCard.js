import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';

const ProductCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('ProductDetails', {item});
      }}>
      <Image source={{uri: item?.image}} style={styles.image} />
      {/* user details */}
      <View style={styles.textContainer}>
        {/* name */}
        <Text style={styles.name}>{item?.title ?? '--'}</Text>
        {/* price */}
        <Text style={styles.email}>Price:- {item?.price ?? '--'}</Text>
        {/* rating and count */}
        <Text style={styles.email}>
          Rating:- {item?.rating?.rate ?? '--'} ({item?.rating?.count ?? '--'})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    padding: 10,
    marginVertical: 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
    gap: 10,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'contain',
    backgroundColor: 'gray',
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: Colors.TEXT1,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '400',
  },
});
