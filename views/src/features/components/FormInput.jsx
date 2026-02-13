const FormInput = ({ name, type = "text", value, setFunc = null }) => {
  let labelName = name;
  let inputPattern = null;

  switch (labelName) {
    case "email":
      labelName = "Email Address: ";
      // inputPattern = "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
      type = "email";
      break;
    case "password":
      labelName = "Password (8 characters minimum): ";
      // inputPattern =
      //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$";
      type = "password";
      break;
    case "phone":
      // inputPattern = "^\\+?[1-9][0-9]{7,14}$";
      type = "tel";
      break;
    default:
      labelName = name[0].toUpperCase().concat(name.slice(1));
      break;
  }

  return (
    <div>
      <label htmlFor={name}>{labelName}: </label>
      <br />
      <input
        id={name}
        name={name}
        type={type}
        minLength={type === "password" ? 8 : null}
        pattern={inputPattern}
        required={true}
        autoComplete="off"
        value={value}
        onChange={setFunc && ((e) => setFunc(e.target.value))}
      />
    </div>
  );
};

export { FormInput };
