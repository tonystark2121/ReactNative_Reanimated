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

const ProductCategories = () => {
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
      console.log(data);
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
    }, []),
  );

  useEffect(() => {
    getProductsByCategory_refetch();
  }, [state.selectedCategory]);

  return (
    <>
      <TopHeader titile={'Product Categories'} showBackIcon={false} />
      {/* filter type catergories */}
      <View style={styles.container}>
        {getAllCategoriesLoading ? (
          <Text>Loading...</Text>
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
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <FilterCategoryCards
                item={item}
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
        renderItem={({item}) => <ProductCard item={item} />}
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
