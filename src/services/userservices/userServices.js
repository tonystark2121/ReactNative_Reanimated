import Config from 'react-native-config';
import {userAxiosInstance} from '../axiosInstance';

export const getUserList = params => {
  return userAxiosInstance.get(
    `${Config.USER_URL}/?results=${10}&page=${params.page}`,
  );
};
