import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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

const FormSelect = (props) => {
  const {
    onCallbackSelect,
    mainClass,
    labelClass,
    placeholder = "Select gender",
    size = "w-[250px] ",
    label = "Gender",
    item = demo,
  } = props;

  const handleSelect = (event) => {
    onCallbackSelect(event);
  };
  return (
    <div className={`flex flex-col gap-2 ${mainClass}`}>
      <Label className={labelClass}>{label}</Label>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className={size}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {item?.map((d, i) => (
            <SelectItem key={i} value={d.value}>
              {d.data}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
