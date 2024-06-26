import Config from 'react-native-config';
import {userAxiosInstance} from '../axiosInstance';

export const getUserList = code => {
  return userAxiosInstance.get(`${Config.USER_URL}/?results=${10}&page=${1}`);
};
