import {
  AppState,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {getUserList} from '../../services/userservices/userServices';
import {useQuery} from 'react-query';
import {ActivityIndicator} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import Colors from '../../constants/Colors';
import UserCard from './components/UserCard';
import {useDispatch, useSelector} from 'react-redux';
import {setPage, setUserData} from '../../services/reducers/CommonReducer';

const UserList = ({navigation}) => {
  // data from redux
  const {userData} = useSelector(store => store.commonStore);
  const {page} = useSelector(store => store.commonStore);

  const dispatch = useDispatch();

  const {
    data: getUserList_data,
    isLoading: getUserListLoading,
    isFetching: getUserListFetching,
    refetch: getUserList_refetch,
  } = useQuery({
    queryKey: ['getUserList', page],
    queryFn: () =>
      getUserList({
        page: page,
      }),
    onSuccess: ({data}) => {
      dispatch(setUserData([...userData, ...data.results]));
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: true,
  });

  // handling the focus event to fetch the user data
  const fetchMore = () => {
    dispatch(setPage(page + 1));
  };

  // handling the focus event to clear the user data
  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      dispatch(setPage(1));
      dispatch(setUserData([]));
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

  return (
    <>
      <TopHeader titile={'User Management App'} showBackIcon={false} />
      <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        {/* <Text>Count: {userData?.length ?? '0'}</Text> */}
        <FlatList
          data={userData}
          renderItem={({item}) => (
            <UserCard item={item} navigation={navigation} />
          )}
          keyExtractor={(_, i) => i}
          ListEmptyComponent={<ListEmptyComponent />}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.2}
          refreshControl={
            <RefreshControl
              refreshing={getUserListFetching || getUserListLoading}
              onRefresh={() => {
                dispatch(setPage(1));
                dispatch(setUserData([]));
                getUserList_refetch();
              }}
              colors={[Colors.PRIMARY]}
            />
          }
          ListFooterComponent={ListEndLoader}
          nestedScrollEnabled
        />
      </View>
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({});
