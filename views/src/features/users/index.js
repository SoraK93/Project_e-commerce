import { changeUserPassword, getEmail, getUser, updateUser } from "./usersAPI";
import { User } from "./User";
import { UpdateUserInfo, ViewProfile, ChangePassword } from "./profile";

// seller
export { ViewProduct } from "./seller/ViewProduct";
export { AddProduct } from "./seller/AddProduct";
export { getProductBySeller } from "./seller/sellerAPI"

export const users = {
  component: { User, ViewProfile, UpdateUserInfo, ChangePassword },
  api: { getUser, updateUser, getEmail, changeUserPassword },
};

export { auth } from "./auth";
