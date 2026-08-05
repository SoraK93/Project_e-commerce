const FormInput = ({ name, labelName, type, value, setFunc = null }) => {
  let inputPattern = null;

  switch (labelName) {
    case "email":
      // inputPattern = "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
      break;
    case "password":
      // inputPattern =
      //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$";
      break;
    case "phone":
      // inputPattern = "^\\+?[1-9][0-9]{7,14}$";
      break;
    default:
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
        className="border rounded-md"
      />
    </div>
  );
};

export { FormInput };
