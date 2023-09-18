import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    invoicenumber: '',
}


const invoiceSlice = createSlice({
  name : "invoice",
  initialState,
  reducers: {
    invoices: (state, {payload}) => {
      state.invoicenumber = payload
      return state
    },
    // resetUserDetails: (state) => initialState,
  }
})

export const {
  actions: {invoices}
} = invoiceSlice

export default invoiceSlice.reducer
