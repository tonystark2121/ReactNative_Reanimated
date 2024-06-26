import {createSlice} from '@reduxjs/toolkit';
const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: {
    // creating the pargination state for managing the user data in the app
    userData: [],
    page: 1,
  },
  reducers: {
    // setting the user data in the state
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // setting the page number in the state
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export default CommonSlice.reducer;
export const {setUserData, setPage} = CommonSlice.actions;
