import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUserCart,
  addToUserCart,
  updateUserCart,
  deleteItemUserCart,
} from "./cartAPI";

const initialState = {
  loading: "initial",
  cartList: [],
};

const handlePending = (state, action) => {
  state.loading = "pending";
};

const handleRejected = (state, action) => {
  state.loading = "rejected";
};

const findTargetCart = (list, id) => {
  return list.find((cart) => cart.product.id === id);
};

const sortCart = (cart) => {
  if (!Array.isArray(cart)) return [];
  return [...cart].sort((a, b) => a.id.localeCompare(b.id));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment(state, action) {
      const cart = findTargetCart(state.cartList, action.payload);
      if (cart.quantity < cart.product.in_stock) cart.quantity++;
    },
    decrement(state, action) {
      const cart = findTargetCart(state.cartList, action.payload);
      if (cart.quantity > 1) cart.quantity--;
    },
    cartCleanUpOnOrder: (state, action) => {
      state.cartList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fulfilled cases
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = "fullfilled";
        state.cartList = sortCart(action.payload.cart);
      })
      .addCase(addToUserCart.fulfilled, (state, action) => {
        state.loading = "fullfilled";
        state.cartList.push(...action.payload.cart);
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cartList = sortCart(action.payload.cart);
      })
      .addCase(deleteItemUserCart.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cartList = state.cartList.filter(
          (cart) => cart.id != action.payload.cart,
        );
      })
      // pending cases
      .addMatcher(
        isAnyOf(
          getUserCart.pending,
          addToUserCart.pending,
          updateUserCart.pending,
          deleteItemUserCart.pending,
        ),
        handlePending,
      )
      // rejected cases
      .addMatcher(
        isAnyOf(
          getUserCart.rejected,
          addToUserCart.rejected,
          updateUserCart.rejected,
          deleteItemUserCart.rejected,
        ),
        handleRejected,
      );
  },
});

export const { increment, decrement, cartCleanUpOnOrder } = cartSlice.actions;

export const selectCartLoading = (state) => state.cart.loading;
export const selectCartList = (state) => state.cart.cartList;

export default cartSlice.reducer;
