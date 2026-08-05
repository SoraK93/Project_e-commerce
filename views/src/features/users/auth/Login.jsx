import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FormInput } from "@features/components/FormInput";
import { loginAPI } from "./loginRegisterAPI";
import { handleChange } from "@utilities/event-helper";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [passwordChangeStatus, setPasswordChangeStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAPI(loginData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (state?.email) {
      setLoginData((prev) => ({ ...prev, email: state.email }));
    }

    if (state?.passwordChange) {
      setPasswordChangeStatus(state.passwordChange);

      const timer = setTimeout(() => setPasswordChangeStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="h-full flex">
      {passwordChangeStatus && (
        <div>
          <p>{passwordChangeStatus}</p>
        </div>
      )}
      <div className="h-full flex flex-col grow justify-center items-center">
        <h1>Login Page</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            labelName="Email"
            value={loginData.email}
            type="email"
            setFunc={(val) => handleChange(setLoginData, "email", val)}
          />
          <FormInput
            name="password"
            labelName="Password (8 characters min.)"
            value={loginData.password}
            type="password"
            setFunc={(val) => handleChange(setLoginData, "password", val)}
          />
          <button>Login</button>
        </form>
        <div>
          <Link to="/auth/register">New User? Click here</Link>
          <br />
          <Link to="#">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export { Login };
