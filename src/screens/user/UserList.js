import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {getUserList} from '../../services/userservices/userServices';
import {useQuery} from 'react-query';
import {ActivityIndicator} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

const UserList = ({navigation}) => {
  const {
    data: getUserList_data,
    isLoading: getUserListLoading,
    isFetching: getUserListFetching,
    refetch: getUserList_refetch,
  } = useQuery({
    queryKey: ['getUserList', 1],
    queryFn: () =>
      getUserList({
        page: 1,
      }),
    onSuccess: ({data}) => {
      console.log(data?.results, 'in sync');
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: false,
  });

  const fetchMore = () => {
    // if (notificationData.page < notificationData.pages) {
    setNotificationData(prev => ({...prev, page: prev.page + 1}));
    // }
  };

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      //   setNotificationData(prev => ({...prev, list: [], page: 1, count: 0}));
    });
    return () => {
      unsubscribeBlur();
    };
  }, [navigation]);

  const ListEndLoader = () => {
    return (
      <View
        style={{
          height: 40,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {getUserListFetching && <ActivityIndicator color={Colors.PRIMARY} />}
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getUserList_refetch();
    }, [navigation]),
  );

  return (
    <>
      <TopHeader titile={'User List'} showBackIcon={false} />
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({});
