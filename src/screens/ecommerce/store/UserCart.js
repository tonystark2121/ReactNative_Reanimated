import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../../components/TopHeader';
import {useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import ListEmptyComponent from '../../../components/ListEmptyComponent';

const UserCart = ({navigation}) => {
  const {selectedProducts} = useSelector(store => store.commonStore);
  return (
    <>
      <TopHeader titile={'User Cart'} showBackIcon={true} />

      <FlatList
        data={selectedProducts}
        ListEmptyComponent={<ListEmptyComponent />}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ProductCard navigation={navigation} key={item.id} item={item} />
        )}
      />
    </>
  );
};

export default UserCart;

const styles = StyleSheet.create({});
