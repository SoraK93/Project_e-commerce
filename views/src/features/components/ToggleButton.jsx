import style from "./ToggleButton.module.css";

const ToggleButton = ({ value, labelName, setFunc }) => {
  return (
    <label>{labelName}
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setFunc(e.target.checked)}
      />
      <span></span>
    </label>
  );
};

export { ToggleButton };
