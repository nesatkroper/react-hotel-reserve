import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PropTypes from "prop-types";

const demo = [
  {
    value: "male",
    data: "Male",
  },
  {
    value: "female",
    data: "Female",
  },
  {
    value: "others",
    data: "Others",
  },
];

const FormRatio = (props) => {
  const {
    onCallbackSelect,
    mainClass,
    labelClass,
    label = "Air Conditional*",
    item = demo,
  } = props;

  const handleSelect = (event) => {
    onCallbackSelect(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className={labelClass}>{label}</Label>
      <RadioGroup
        onValueChange={handleSelect}
        defaultValue="true"
        className={`flex pt-2 ${mainClass}`}
      >
        {item?.map((d, i) => (
          <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem value={d.value} id={d.value} />
            <Label htmlFor={d.value}>{d.data}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

FormRatio.propTypes = {
  onCallbackSelect: PropTypes.func,
  mainClass: PropTypes.string,
  labelClass: PropTypes.string,
  label: PropTypes.string,
  item: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
    })
  ),
};

export default FormRatio;
