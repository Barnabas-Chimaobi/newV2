import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  department: [],
  session: [],
  programme: [],
  faculty: [],
  active: "one",
  activeTwo: "",
  activeThree: "",
  activeFour: "",
  activeFive: "",
  paygenerated: "",
  olevel: [],
  olevel2: [],
  applicantId: 0,
  activateStep1: "one",
  activateStep2: "",
  activateStep3: "",
  activateStep4: "",
  pageOlevel: "",
  pagePassport: "",
  passport: "",
  applicationFormNo: "",
  courseArr: [],
};

const schoolSetupSlice = createSlice({
  name: "schoolSetup",
  initialState,
  reducers: {
    session: (state, { payload }) => {
      state.session = payload;
      return state;
    },
    programme: (state, { payload }) => {
      state.programme = payload;
      return state;
    },
    faculty: (state, { payload }) => {
      state.faculty = payload;
      return state;
    },
    department: (state, { payload }) => {
      state.department = payload;
      return state;
    },
    active: (state, { payload }) => {
      state.active = payload;
    },
    activeTwo: (state, { payload }) => {
      state.activeTwo = payload;
    },
    activeThree: (state, { payload }) => {
      state.activeThree = payload;
    },
    activeFour: (state, { payload }) => {
      state.activeFour = payload;
    },
    activeFive: (state, { payload }) => {
      state.activeFive = payload;
    },
    paygenerated: (state, { payload }) => {
      state.paygenerated = payload;
    },
    olevel: (state, { payload }) => {
      state.olevel = payload;
    },
    olevel2: (state, { payload }) => {
      state.olevel2 = payload;
    },
    applicantId: (state, { payload }) => {
      state.applicantId = payload;
    },
    activateStep1: (state, { payload }) => {
      state.activateStep1 = payload;
    },
    activateStep2: (state, { payload }) => {
      state.activateStep2 = payload;
    },

    activateStep3: (state, { payload }) => {
      state.activateStep3 = payload;
    },
    activateStep4: (state, { payload }) => {
      state.activateStep4 = payload;
    },
    pageOlevel: (state, { payload }) => {
      state.pageOlevel = payload;
    },
    pagePassport: (state, { payload }) => {
      state.pagePassport = payload;
    },
    passport: (state, { payload }) => {
      state.passport = payload;
    },
    applicationFormNo: (state, { payload }) => {
      state.applicationFormNo = payload;
    },
    courseArr: (state, { payload }) => {
      state.courseArr = payload;
    },

    // resetUserDetails: (state) => initialState,
  },
});

export const {
  actions: {
    programme,
    session,
    department,
    faculty,
    active,
    activeTwo,
    activeThree,
    activeFour,
    activeFive,
    paygenerated,
    olevel,
    olevel2,
    applicantId,
    activateStep1,
    activateStep2,
    activateStep3,
    activateStep4,
    pageOlevel,
    pagePassport,
    passport,
    applicationFormNo,
    courseArr,
  },
} = schoolSetupSlice;

export default schoolSetupSlice.reducer;
