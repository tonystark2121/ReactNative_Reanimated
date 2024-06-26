import {createSlice} from '@reduxjs/toolkit';
const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: {
    schoolDocId: '',
    studentDocId: '',
    childName: '',
    selectedChildClassDetails: {},
    selectedChild: {},
    schoolDetail: {},
    schooleSession: '',
    childList: [],
    schoolMedium: '',
    attendanceFilter: false,
    SchoolList: '',
    schoolAuthData: '',
    loggedInUserProfile: '',
    switchSchool: false,
    profileScreen: false,
    applySchoolScreen: false,
    schoolListScreen: false,
  },
  reducers: {
    setAttendanceFilter: (state, action) => {
      state.attendanceFilter = action.payload;
    },
    setMedium: (state, action) => {
      state.schoolMedium = action.payload;
    },
    setSelectedChild: (state, action) => {
      state.selectedChild = action.payload;
    },
    setSession: (state, action) => {
      state.schooleSession = action.payload;
    },
    setSchoolAuthData: (state, {payload}) => {
      state.schoolAuthData = payload;
    },
    setSchoolList: (state, {payload}) => {
      state.SchoolList = payload;
    },
    setSwitchSchool: (state, action) => {
      state.switchSchool = true;
    },
    setSchoolDocId: (state, action) => {
      state.schoolDocId = null;
      state.schoolDocId = action.payload;
    },
    setStudentDocId: (state, action) => {
      state.studentDocId = null;
      state.studentDocId = action.payload;
    },
    setChildName: (state, action) => {
      (state.childName = ''), (state.childName = action.payload);
    },
    setSingleSchool: (state, {payload}) => {
      state.schoolDetail = payload;
    },
    clearAllForLogout: state => {
      state.studentDocId = '';
      state.schoolDocId = '';
      state.attendanceFilter = false;
      state.SchoolList = '';
      state.profileScreen = false;
      state.applySchoolScreen = false;
      state.schoolListScreen = false;
      state.selectedChild = {};
      state.childList = [];
    },
    setLoggedInUserProfile: (state, {payload}) => {
      state.loggedInUserProfile = payload;
    },
    setChildList: (state, {payload}) => {
      state.childList = payload;
    },
    setProfileScreen: (state, {payload}) => {
      if (payload === 'false') {
        state.profileScreen = false;
      } else {
        state.profileScreen = true;
      }
    },
    setApplySchoolScreen: state => {
      state.applySchoolScreen = true;
    },
    setSchoolListScreen: state => {
      state.schoolListScreen = true;
    },
    clearSelectedChild: state => {
      state.selectedChild = {};
    },
  },
});
export default CommonSlice.reducer;
export const {
  setAttendanceFilter,
  setMedium,
  setSession,
  clearAllForLogout,
  setSchoolList,
  setSchoolAuthData,
  setLoggedInUserProfile,
  setSingleSchool,
  setSwitchSchool,
  setApplySchoolScreen,
  setProfileScreen,
  setSchoolListScreen,
  setSchoolDocId,
  setStudentDocId,
  setChildName,
  setSelectedChild,
  clearSelectedChild,
  setChildList,
} = CommonSlice.actions;
