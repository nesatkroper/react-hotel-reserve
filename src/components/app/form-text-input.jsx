import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FormTextInput = (props) => {
  const {
    onCallbackInput,
    name,
    value,
    mainClass,
    inputClass,
    labelClass,
    placeholder = "Food, Drink, ...",
    size = "w-[250px] ",
    label = "Email*",
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
        type="text"
        placeholder={placeholder}
        className={`${inputClass} ${size}`}
      />
    </div>
  );
};

export default FormTextInput;
