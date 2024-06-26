import axios from 'axios';
import Config from 'react-native-config';
import store from './store';
import {setLoginState, setLogout} from './reducers/AuthReducer';

const userAxiosInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

userAxiosInstance.interceptors.request.use(async req => {
  // const {
  //   authStore: {login_Data},
  // } = store.getState();
  console.log('in user url', req.url, req.params, req.data);
  // try {
  //   // const currentTime = new Date().getTime();
  //   // if (currentTime > login_Data?.exp) {
  //   //   const body = {
  //   //     refreshToken: login_Data?.refreshToken,
  //   //   };
  //   //   const {data} = await axios.post(
  //   //     `${Config.AUTH_URL}/auth/refreshToken`,
  //   //     body,
  //   //   );
  //   //   const newData = {
  //   //     ...data,
  //   //     token: data?.accessToken,
  //   //   };
  //   //   const {dispatch} = store;
  //   //   // console.log(newData , "in refreshtoaken");
  //   //   dispatch(setLoginState(newData));
  //   //   req.headers['Authorization'] = `Bearer ${data?.accessToken}`;
  //   //   return req;
  //   // }
  // } catch (error) {
  //   // const {dispatch} = store;
  //   // dispatch(setLogout());
  // }
  // req.headers['Authorization'] = `Bearer ${login_Data?.token}`;
  return req;
});

export {userAxiosInstance};
