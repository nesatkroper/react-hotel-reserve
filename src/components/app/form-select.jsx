import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const item = [
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

const FormSelect = () => {
  const handleSelect = () => {};
  return (
    <div className="flex flex-col gap-2">
      <Label>Gender</Label>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select gender" />
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
