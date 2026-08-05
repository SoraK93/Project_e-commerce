import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createOrder, getOrderById, getOrderList } from "./orderAPI";

const handlePending = (state, _) => {
  state.loading = "pending";
};

const handleReject = (state, _) => {
  state.loading = "rejected";
};

const initialState = {
  loading: "initial",
  list: [],
  cartStatus: "empty",
};

const order = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fulfilled case
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.list = action.payload.data;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.list = action.payload.data;
      })

      .addCase(createOrder.fulfilled, (state, _) => {
        state.loading = "fulfilled";
        state.cartStatus = "fulfilled";
      })
      .addCase(createOrder.rejected, (state, _) => {
        state.loading = "rejected";
        state.cartStatus = "rejected";
      })
      // pending case
      .addMatcher(
        isAnyOf(
          getOrderList.pending,
          getOrderById.pending,
          createOrder.pending,
        ),
        handlePending,
      )
      // rejected case
      .addMatcher(
        isAnyOf(getOrderList.rejected, getOrderById.rejected),
        handleReject,
      );
  },
});

export default order.reducer;

export const selectOrderLoading = (state) => state.order.loading;
export const selectOrderList = (state) => state.order.list;
export const selectOrderCartStatus = (state) => state.order.cartStatus;
