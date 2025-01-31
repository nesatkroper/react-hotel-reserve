import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/providers/axiosInstance";
import { getPositions } from "@/app/reducer/position-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDepartments } from "@/app/reducer/department-slice";

const PositionDialog = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { depData } = useSelector((state) => state.departments);
  const [formData, setFormData] = useState({
    department_id: 0,
    position_name: "",
    position_code: 0,
    memo: "",
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  // console.log(lastCode);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      position_code: lastCode + 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/positions", formData)
      .then((res) => {
        console.log(res);
        dispatch(getPositions());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Position Details Information.</DialogTitle>
          </DialogHeader>
          <Separator className="my-3" />
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Department Name*</Label>
              <Input
                onChange={handleChange}
                name="department_name"
                type="text"
                placeholder="IT, Finance, ..."
                className="w-[250px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>Department Code*</Label>
              <Input
                value={`POS-${(lastCode + 1).toString().padStart(3, "0")}`}
                type="text"
                className="w-[250px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Department</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                  >
                    {value
                      ? depData?.find(
                          (dep) => String(dep.department_id) === value
                        )?.department_name
                      : "Select Department..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search department..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Department found.</CommandEmpty>
                      <CommandGroup>
                        {depData?.map((dep) => (
                          <CommandItem
                            key={dep.department_id}
                            value={String(dep.department_id)}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
                              setOpen(false);
                              setFormData((prevData) => ({
                                ...prevData,
                                department_id: Number(currentValue),
                              }));
                            }}
                          >
                            {dep.department_name}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === dep.department_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Decription</Label>
              <Textarea
                onChange={handleChange}
                name="memo"
                placeholder="N/A"
                cols={20}
                className="w-[250px]"
              />
            </div>
          </div>
          <DialogClose>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

export default PositionDialog;
