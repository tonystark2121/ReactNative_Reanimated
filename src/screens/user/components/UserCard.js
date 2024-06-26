import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Sizes from '../../../constants/Sizes';
import {FormatFullName} from '../../../utils/helper';

const UserCard = ({item, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('UserDetail', {item});
      }}>
      <Image source={{uri: item?.picture?.medium}} style={styles.image} />
      {/* user details */}
      <View style={styles.textContainer}>
        {/* name */}
        <Text style={styles.name}>
          {FormatFullName(
            item?.name?.title,
            item?.name?.first,
            item?.name?.last,
          )}
        </Text>
        {/* gender */}
        <Text style={styles.email}>Gender:- {item?.gender}</Text>
        {/* email */}
        <Text style={styles.email}>Email:- {item?.email}</Text>
        {/* phone */}
        <Text style={styles.email}>Phone:- {item?.phone}</Text>
        {/* cell */}
        <Text style={styles.email}>Cell:- {item?.cell}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
