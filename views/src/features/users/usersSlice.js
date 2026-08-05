import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getUser, updateUser } from "./usersAPI";

const initial = {
  info: { id: null, name: null, phone: null, address: null, is_seller: false },
  loading: "initial",
  error: null,
};

const handlePending = (state, action) => {
  state.loading = "pending";
  state.info = initial.info;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = "failed";
};

const handleFulfilled = (state, action) => {
  state.loading = "fulfilled";
  state.info = action.payload;
  state.error = null;
};

const user = createSlice({
  name: "users",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fulfilled case
      .addMatcher(
        isAnyOf(getUser.fulfilled, updateUser.fulfilled),
        handleFulfilled,
      )
      // pending case
      .addMatcher(isAnyOf(getUser.pending, updateUser.pending), handlePending)
      // rejected case
      .addMatcher(
        isAnyOf(getUser.rejected, updateUser.rejected),
        handleRejected,
      );
  },
});

export const selectUserInfo = (state) => state.users.info
export const selectUserLoading = (state) => state.users.loading
export const selectUserError = (state) => state.users.error

export default user.reducer;
