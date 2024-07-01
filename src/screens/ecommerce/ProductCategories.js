import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {
  getAllCategories,
  getProductsByCategory,
} from '../../services/ecommerce/ecommerce.services';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from 'react-query';
import FilterCategoryCards from './components/FilterCategoryCards';
import ProductCard from './components/ProductCard';
import Loader from '../../components/Loader';
import ListEmptyComponent from '../../components/ListEmptyComponent';

const ProductCategories = ({navigation}) => {
  const [state, setState] = useState({
    productCategoriesData: [],
    selectedCategory: '',
    selectedCategoryProducts: [],
  });

  const {
    data: getAllCategories_data,
    isLoading: getAllCategoriesLoading,
    isFetching: getAllCategoriesFetching,
    refetch: getAllCategories_refetch,
  } = useQuery({
    queryKey: ['getAllCategories'], //with the help of this key we can refetch the data
    queryFn: () => getAllCategories({}),
    onSuccess: ({data}) => {
      setState({
        ...state,
        productCategoriesData: data,
        selectedCategory: data[0],
      });
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: true,
  });
  const {
    data: getProductsByCategory_data,
    isLoading: getProductsByCategoryLoading,
    isFetching: getProductsByCategoryFetching,
    refetch: getProductsByCategory_refetch,
  } = useQuery({
    queryKey: ['getProductsByCategory'], //with the help of this key we can refetch the data
    queryFn: () =>
      getProductsByCategory({
        categories: state.selectedCategory,
      }),
    onSuccess: ({data}) => {
      setState({
        ...state,
        selectedCategoryProducts: data,
      });
    },
    onError: err =>
      ToastAndroid.show(err?.response?.data?.message, ToastAndroid.LONG),
    enabled: true,
  });

  useFocusEffect(
    useCallback(() => {
      getAllCategories_refetch();
    }, [navigation]),
  );

  useEffect(() => {
    getProductsByCategory_refetch();
  }, [state.selectedCategory]);

  return (
    <>
      <TopHeader
        titile={'Product Categories'}
        cart={true}
        onPress={() => {
          navigation.navigate('UserCart');
        }}
        showBackIcon={false}
      />
      {/* filter type catergories */}
      <View style={styles.container}>
        {getAllCategoriesLoading ? (
          <Loader open={getAllCategoriesLoading} text="Loading..." />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: 10,
              flexDirection: 'row',
              gap: 10,
              backgroundColor: '#f5f5f5',
            }}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={getAllCategoriesFetching || getAllCategoriesLoading}
            //     onRefresh={() => {
            //       getAllCategories_refetch();
            //     }}
            //   />
            // }
            data={state.productCategoriesData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <FilterCategoryCards
                item={item}
                key={item.id}
                state={state}
                setState={setState}
                getAllCategories_refetch={getAllCategories_refetch}
              />
            )}
          />
        )}
      </View>

      {/* product list */}
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
        }}
        refreshControl={
          <RefreshControl
            refreshing={
              getProductsByCategoryLoading || getProductsByCategoryFetching
            }
            onRefresh={() => {
              getProductsByCategory_refetch();
            }}
          />
        }
        data={state?.selectedCategoryProducts}
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={({item}) => (
          <ProductCard navigation={navigation} key={item.id} item={item} />
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default ProductCategories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
});
