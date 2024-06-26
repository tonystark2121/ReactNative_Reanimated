import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Images from '../constants/Images';
import Sizes from '../constants/Sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearSelectedChild} from '../services/reducers/CommonReducer';
import Feather from 'react-native-vector-icons/Feather';
import {Badge} from 'react-native-paper';
const TopHeader = ({
  titile,
  right,
  onPress,
  showBackIcon = true,
  path = '',
  docId = '',
  filter,
  logout = false,
  notification,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPressBack = () => {
    if (logout) {
      dispatch(clearSelectedChild());
    } else {
      if (path) {
        navigation.navigate(path, {
          studentDocId: docId,
        });
      } else {
        navigation.goBack();
      }
    }
  };
  return (
    <ImageBackground source={Images.topHeader} style={styles.root}>
      <View style={styles.left_wrap}>
        {/* Back button */}
        {showBackIcon && (
          <TouchableOpacity style={styles.left_icon_wrap} onPress={onPressBack}>
            <MaterialIcons
              name="keyboard-arrow-left"
              style={styles.left_icon}
            />
          </TouchableOpacity>
        )}
        {/* title */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {titile}
        </Text>
      </View>
      {right ? (
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="delete" style={styles.icon} />
        </TouchableOpacity>
      ) : filter ? (
        <View style={styles.notificationIconContainer}>
          <TouchableOpacity style={{left: 10}} onPress={onPress}>
            <AntDesign name="filter" size={26} color="white" />
          </TouchableOpacity>
        </View>
      ) : notification ? (
        <View style={styles.notificationIconContainer}>
          <TouchableOpacity style={{left: 10}} onPress={onPress}>
            <Badge
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
              }}
              size={10}>
              3
            </Badge>
            <Feather name="bell" size={26} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </ImageBackground>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  root: {
    height: Sizes.hp('13%'),
    resizeMode: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.wp('5%'),

    paddingTop: Sizes.hp('5%'),
  },
  left_wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left_icon_wrap: {
    height: 30,
    width: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginRight: 13,
    borderWidth: 1,
    borderColor: '#fff',
  },
  left_icon: {
    color: '#fff',
    fontSize: scale(20),
  },
  title: {
    color: '#fff',
    fontSize: scale(19),
    letterSpacing: 1.2,
    flex: 1,
    maxWidth: Sizes.wp('72%'),
  },
  icon: {
    color: '#fff',
    fontSize: scale(25),
  },
  notificationIconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});
