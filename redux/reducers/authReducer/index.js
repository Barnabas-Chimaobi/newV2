import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	payload: [],
	loggedIn: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userDetails: (state, { payload }) => {
			state.payload = payload;
			return state;
		},
		loggedIn: (state, { payload }) => {
			state.payload = payload;
		},
		// resetUserDetails: (state) => initialState,
	},
});

export const {
	actions: { userDetails, loggedIn },
} = userSlice;

export default userSlice.reducer;
