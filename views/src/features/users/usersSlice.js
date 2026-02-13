import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "users",
  initialState: {
    info: { id: "", name: "", phone: "", address: "", is_seller: false },
    loading: "initial",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export const selectUser = {
  info: (state) => state.users.info,
  loading: (state) => state.users.loading,
  error: (state) => state.users.error,
};
export default user.reducer;
