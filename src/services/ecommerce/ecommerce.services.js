import Config from 'react-native-config';
import {userAxiosInstance} from '../axiosInstance';

export const getAllCategories = params => {
  return userAxiosInstance.get(`${Config.ECOMMERCE_URL}/products/categories`);
};

export const getProductsByCategory = params => {
  return userAxiosInstance.get(
    `${Config.ECOMMERCE_URL}/products/category/${params?.categories}`,
  );
};
