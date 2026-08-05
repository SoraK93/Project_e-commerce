import { FormInput, ToggleButton } from "../../components";
import { handleChange } from "../../../utilities/event-helper";

const UpdateProfile = ({ handleSubmit, setFormData, formData }) => {
  return (
    <form method="POST" onSubmit={handleSubmit}>
      {["name", "phone", "address"].map((field) => (
        <FormInput
          name={field}
          value={formData[field]}
          setFunc={(val) => handleChange(setFormData, field, val)}
          key={`registrationform-${field}`}
        />
      ))}
      <ToggleButton
        value={formData.is_seller}
        setFunc={(val) => handleChange(setFormData, "is_seller", val)}
      />
      <button>Update</button>
    </form>
  );
};

export { UpdateProfile };
