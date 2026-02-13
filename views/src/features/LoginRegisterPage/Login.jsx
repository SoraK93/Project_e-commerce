import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FormInput } from "../components";
import { loginAPI } from "./loginRegisterAPI";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (field, value) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAPI(loginData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  useEffect(() => {
    setLoginData((prev) => ({ ...prev, email: state?.email ?? "" }));
  }, [state]);

  return (
    <div>
      <h1>Login Page</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          value={loginData.email}
          setFunc={(val) => handleChange("email", val)}
        />
        <FormInput
          name="password"
          value={loginData.password}
          setFunc={(val) => handleChange("password", val)}
        />
        <button>Login</button>
      </form>
      <div>
        <Link to="/auth/register">New User? Click here</Link>
        <br />
        <Link to="#">Forgot Password</Link>
      </div>
    </div>
  );
};

export { Login };
