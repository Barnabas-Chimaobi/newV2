import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	printRegisteredCourses: false,
	showRegistered: false,
	registeredParams: {},
};

const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		printRegistered: (state, { payload }) => {
			state.printRegisteredCourses = payload;
			return state;
		},
		showRegistered: (state, { payload }) => {
			state.showRegistered = payload;
			return state;
		},
		showRegisterParams: (state, { payload }) => {
			state.registeredParams = payload;
			return state;
		},
		// resetUserDetails: (state) => initialState,
	},
});

export const {
	actions: { printRegistered, showRegistered, showRegisterParams },
} = studentSlice;

export default studentSlice.reducer;