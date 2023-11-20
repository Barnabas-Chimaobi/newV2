import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	invoicenumber: "",
	statuses: "",
};

const invoiceSlice = createSlice({
	name: "invoice",
	initialState,
	reducers: {
		invoices: (state, { payload }) => {
			state.invoicenumber = payload;
			return state;
		},
		statuses: (state, { payload }) => {
			state.statuses = payload;
			return state;
		},
		// resetUserDetails: (state) => initialState,
	},
});

export const {
	actions: { invoices, statuses },
} = invoiceSlice;

export default invoiceSlice.reducer;
