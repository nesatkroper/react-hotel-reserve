import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const FormInput = (props) => {
  const {
    onCallbackInput,
    name,
    value,
    type = "text",
    mainClass,
    inputClass,
    labelClass,
    placeholder = "Food, Drink, ...",
    size = 250,
    label = "Email*",
    readonly = false,
    required = false,
    min = 0,
    step = 0.01,
  } = props;

  const handleChange = (event) => {
    onCallbackInput(event);
  };
  return (
    <div className={`flex flex-col gap-2 ${mainClass}`}>
      <Label className={`${labelClass}`}>{label}</Label>
      <Input
        onChange={handleChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${inputClass} w-[${size}px]`}
        readOnly={readonly}
        min={min}
        step={step}
        required={required}
      />
    </div>
  );
};

FormInput.propTypes = {
  onCallbackInput: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  mainClass: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
  readonly: PropTypes.bool,
  min: PropTypes.number,
  step: PropTypes.number,
  required: PropTypes.bool,
};

export default FormInput;
