// paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PaymentItem } from "@/types";

interface PaymentState {
  items: PaymentItem[];
}

const initialState: PaymentState = {
  items: [],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPaymentItem: (state, action: PayloadAction<PaymentItem>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addPaymentItem } = paymentSlice.actions;
export default paymentSlice.reducer;
