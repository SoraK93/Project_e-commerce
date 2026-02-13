import style from "./ToggleButton.module.css";

const ToggleButton = ({ value, setFunc }) => {
  return (
    <label className={style.switch}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setFunc(e.target.checked)}
      />
      <span className={`${style.slider} ${style.round}`}></span>
    </label>
  );
};

export { ToggleButton };
