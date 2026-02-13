import userReducer, { selectUser } from "./usersSlice";

export const users = {
  reducer: userReducer,
  select: selectUser,
};