import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormTextArea = (props) => {
  const {
    onCallbackInput,
    name,
    value,
    type,
    mainClass,
    inputClass,
    labelClass,
    placeholder = "Food, Drink, ...",
    label = "Email*",
  } = props;

  const handleChange = (event) => {
    onCallbackInput(event.target);
  };
  return (
    <div className={`lex flex-col gap-2 justify-between mb-2 ${mainClass}`}>
      <Label className={`${labelClass}`}>{label}</Label>
      <Textarea
        onChange={handleChange}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${inputClass}`}
      />
    </div>
  );
};

export default FormTextArea;
