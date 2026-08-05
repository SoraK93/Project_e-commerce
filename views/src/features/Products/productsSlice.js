import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllProduct, getProductById } from "./productsAPI";
import { getProductBySeller } from "../users/seller/sellerAPI";

const handlePending = (state, action) => {
  state.loading = "pending";
  state.productList = [];
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = "rejected";
  state.error = action;
};

const handleFulfilled = (state, action) => {
  state.loading = "fulfilled";
  state.productList = action.payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: "initial",
    productList: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending cases
      .addMatcher(
        isAnyOf(
          getAllProduct.pending,
          getProductById.pending,
          getProductBySeller.pending,
        ),
        handlePending,
      )
      // fulfilled cases
      .addMatcher(
        isAnyOf(
          getAllProduct.fulfilled,
          getProductById.fulfilled,
          getProductBySeller.fulfilled,
        ),
        handleFulfilled,
      )
      // rejected cases
      .addMatcher(
        isAnyOf(
          getAllProduct.rejected,
          getProductById.rejected,
          getProductBySeller.rejected,
        ),
        handleRejected,
      );
  },
});

export const selectProduct = {
  loading: (state) => state.products.loading,
  list: (state) => state.products.productList,
  error: (state) => state.products.error,
};

export const selectProductList = (state) => state.products.productList

export default productsSlice.reducer;
