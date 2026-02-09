import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllProduct, getProductById } from "./productsAPI";

const handlePending = (state, action) => {
  state.loading = "pending";
  state.productList = [];
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = "rejected";
  state.error = action;
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
      // get list of all products
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.productList = action.payload;
      })

      // get a single product details
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.productList = action.payload;
      })

      // handle all common pending cases
      .addMatcher(
        isAnyOf(getAllProduct.pending, getProductById.pending),
        handlePending,
      )
      // handle all common rejected cases
      .addMatcher(
        isAnyOf(getAllProduct.rejected, getProductById.rejected),
        handleRejected,
      );
  },
});

export const selectProduct = {
  loading: (state) => state.products.loading,
  list: (state) => state.products.productList,
  error: (state) => state.products.error,
};
export default productsSlice.reducer;
