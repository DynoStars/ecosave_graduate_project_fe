import { PaymentItem, PaymentState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: PaymentState = {
  items: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addPaymentItem: (state, action: PayloadAction<PaymentItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removePaymentItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Cập nhật số lượng sản phẩm
    updatePaymentQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearPayment: (state) => {
      state.items = [];
    },
  },
});

export const { addPaymentItem, removePaymentItem, updatePaymentQuantity, clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;