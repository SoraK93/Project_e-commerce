import { Login } from "./Login";
import { Register } from "./Register";
import { loginAPI, registerAPI, logoutAPI } from "./loginRegisterAPI";
export const auth = {
  component: { Login, Register },
  api: { loginAPI, registerAPI, logoutAPI },
};