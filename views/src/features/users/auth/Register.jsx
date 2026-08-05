import { Link, useNavigate } from "react-router";
import { FormInput, ToggleButton } from "../../components";
import { useState } from "react";
import { registerAPI } from "./loginRegisterAPI";
import { handleChange } from "../../../utilities/event-helper";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    is_seller: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAPI(formData);
    navigate("/auth/login", {
      state: { email: formData.email },
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl ">Register Page</h1>
      <form method="POST" onSubmit={handleSubmit}>
        {Object.entries({
          name: "Enter Full Name",
          email: "Email:",
          password: "Password",
          phone: "Phone Number",
          address: "Permanent Address",
        }).map(([key, value]) => (
          <FormInput
            name={key}
            labelName={value}
            value={formData[key]}
            setFunc={(val) => handleChange(setFormData, key, val)}
            key={`registrationform-${key}`}
          />
        ))}
        <ToggleButton
          value={formData.is_seller}
          labelName="Are you a seller?"
          setFunc={(val) => handleChange(setFormData, "isSeller", val)}
        />
        <br />
        <button>Register</button>
      </form>
      <div>
        <Link to="/auth/login">Already registered? Click here</Link>
        <br />
        <Link to="#">Forgot Password</Link>
      </div>
    </div>
  );
};

export { Register };
