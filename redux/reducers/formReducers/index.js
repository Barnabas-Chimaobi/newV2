import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fieldType: "",
	fieldName: "",
	generatedForm: [],
	activeFormView: "one",
};

const formSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		fieldType: (state, { payload }) => {
			state.fieldType = payload;
			return state;
		},
		fieldName: (state, { payload }) => {
			state.fieldName = payload;
			return state;
		},
		generatedForm: (state, { payload }) => {
			state.generatedForm = payload;
			return state;
		},
		activeFormView: (state, { payload }) => {
			state.activeFormView = payload;
			return state;
		},
		// resetUserDetails: (state) => initialState,
	},
});

export const {
	actions: { fieldName, fieldType, generatedForm, activeFormView },
} = formSlice;

export default formSlice.reducer;
