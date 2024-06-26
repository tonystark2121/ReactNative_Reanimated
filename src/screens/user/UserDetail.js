import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TopHeader from '../../components/TopHeader';
import {FormatFullName} from '../../utils/helper';
import Colors from '../../constants/Colors';
import ProfilePic from '../../components/ProfilePic';
import Sizes from '../../constants/Sizes';
import {Divider} from 'react-native-paper';
import moment from 'moment';

const MailOpen = async email => {
  console.log(email);
  if (Platform.OS === 'ios') {
    email = `mailto:${email}`;
  } else {
    email = `mailto:${email}`;
  }
  return await Linking.openURL(email);
};

const RowContainerItem = ({label, value}) => {
  return (
    <>
      {label == 'Email' ? (
        <>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text
              onPress={() => MailOpen(value)}
              style={[
                styles.titile,
                {color: Colors.PRIMARY, textDecorationLine: 'underline'},
              ]}>
              {value}
            </Text>
          </View>
          <Divider
            style={{height: 1, width: Sizes.wp('95%'), alignSelf: 'center'}}
          />
        </>
      ) : (
        <>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.titile}>{value}</Text>
          </View>
          <Divider
            style={{height: 1, width: Sizes.wp('95%'), alignSelf: 'center'}}
          />
        </>
      )}
    </>
  );
};

const UserDetail = ({route, navigation}) => {
  const {item} = route.params || {};
  return (
    <>
      <TopHeader
        titile={FormatFullName(
          item?.name?.title,
          item?.name?.first,
          item?.name?.last,
        )}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          backgroundColor: Colors.background,
        }}>
        {/* profile pic */}
        <View style={{marginTop: 10}} />
        <ProfilePic imageUrl={item?.picture?.large} showCamera={false} />

        <View style={styles.container}>
          {/* name */}
          <Text style={styles.text}>
            {FormatFullName(
              item?.name?.title,
              item?.name?.first,
              item?.name?.last,
            )}
          </Text>
          {/* container */}
          <View style={styles.detailContainer}>
            {/* gender */}
            <RowContainerItem label={'Gender'} value={item?.gender ?? '--'} />
            {/* email */}
            <RowContainerItem label={'Email'} value={item?.email ?? '--'} />
            <RowContainerItem
              label={'DOB'}
              value={moment(item?.dob?.date).format('LL') ?? '--'}
            />
            <RowContainerItem label={'Age'} value={item?.dob?.age ?? '--'} />
            <RowContainerItem
              label={'Registered'}
              value={moment(item?.registered?.date).format('LL') ?? '--'}
            />
            <RowContainerItem label={'Phone'} value={item?.phone ?? '--'} />
            <RowContainerItem label={'Cell'} value={item?.cell ?? '--'} />
            <RowContainerItem
              label={'Adress'}
              value={
                `${item?.location?.street?.number ?? null} ${
                  item?.location?.street?.name ?? null
                } ${item?.location?.city ?? null} ${
                  item?.location?.state ?? null
                }  ${item?.location?.country ?? null}` ?? '--'
              }
            />
            <RowContainerItem
              label={'Time Zone'}
              value={item?.location?.timezone?.description ?? '--'}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  titile: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    flex: 0.4,
    fontSize: 16,
    color: Colors.TEXT1,
    fontWeight: '500',
    margin: 4,
  },
  detailContainer: {
    width: Sizes.wp('95%'),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 1,
  },
});
