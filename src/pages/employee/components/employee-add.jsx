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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defimg } from "@/utils/resize-crop-image";
import { getPositions } from "@/app/reducer/positionSlice";
import { getEmployees } from "@/app/reducer/employeeSlice";
import axiosInstance from "@/providers/axiosInstance";
import CropImageUploader from "@/components/app/utils/crop-image-uploader";

const EmployeeAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [dob, setDOB] = useState();
  const [hired, setHired] = useState(new Date());
  const [imagePreview, setImagePreview] = useState(defimg);
  const { posData } = useSelector((state) => state?.positions);
  const [formData, setFormData] = useState(() => {
    const form = new FormData();
    form.append("employee_code", lastCode + 1);
    form.append("auth_id", 0);
    form.append("account_status", "available");
    form.append("first_name", "");
    form.append("last_name", "");
    form.append("picture", "");
    form.append("gender", "");
    form.append("dob", "");
    form.append("email", "");
    form.append("phone", "");
    form.append("address", "");
    form.append("city", "Siem Reap");
    form.append("state", "Siem Reap");
    form.append("position_id", 0);
    form.append("department_id", 0);
    form.append("salary", 0);
    form.append("hired_date", 0);
    return form;
  });

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    formData.set(name, value);
    formData.set("product_code", lastCode + 1);
    formData.set("dob", format(dob, "yyyy-MM-dd"));
    formData.set("hired_date", format(hired, "yyyy-MM-dd"));
  };

  const handleChangeGender = (event) => {
    formData.set("gender", event);
  };

  const handleFormData = (data) => {
    for (let [key, value] of data.entries()) {
      formData.set(key, value);
    }

    if (data.has("picture")) {
      const file = data.get("picture");
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }

    return formData;
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      await axiosInstance
        .post("/employee", formData)
        .then((res) => {
          console.log(res);
          dispatch(getEmployees());
        })
        .catch((error) => {
          console.log("Error submitting form:", error);
        });
      console.log(formData);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(formData);

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Emoloyee Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>First Name*</Label>
              <Input
                onChange={handleChange}
                name="first_name"
                type="text"
                placeholder="Sok, ..."
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Last Name*</Label>
              <Input
                onChange={handleChange}
                name="last_name"
                type="text"
                placeholder="San, ..."
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <div className="flex flex-col gap-2">
              <Label>Employee Code</Label>
              <Input
                value={`EMP-${(lastCode + 1).toString().padStart(5, "0")}`}
                readOnly
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <Select onValueChange={handleChangeGender}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>Phone Number*</Label>
              <Input
                onChange={handleChange}
                name="phone"
                type="number"
                placeholder="+855 12 345 678"
                className="w-[250px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email Address</Label>
              <Input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="someone@somemail.com"
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>Date of Birth*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[250px] justify-start text-left font-normal",
                      !dob && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={setDOB}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Hired Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[250px] justify-start text-left font-normal",
                      !hired && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {hired ? format(hired, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={hired}
                    onSelect={setHired}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>City*</Label>
              <Input
                onChange={handleChange}
                name="city"
                type="text"
                placeholder="Siem Reap"
                className="w-[250px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>State*</Label>
              <Input
                onChange={handleChange}
                name="state"
                type="teext"
                placeholder="Siem Reap"
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between mb-2">
            <Label>Address</Label>
            <Textarea
              onChange={handleChange}
              name="address"
              placeholder="Something ..."
            />
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <div className="flex flex-col gap-2">
              <Label>Position*</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                  >
                    {value
                      ? posData?.find(
                          (pos) => String(pos.position_id) === value
                        )?.position_name
                      : "Select Position..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search position category..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Position found.</CommandEmpty>
                      <CommandGroup>
                        {posData?.map((pos) => (
                          <CommandItem
                            key={pos.position_id}
                            value={String(pos.position_id)}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
                              setOpen(false);
                              formData.set("position_id", currentValue);
                              formData.set(
                                "department_id",
                                pos[0]?.departments?.department_id
                              );
                            }}
                          >
                            {pos.position_name}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === pos.position_id
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
              <Label>Salary*</Label>
              <Input
                onChange={handleChange}
                name="salary"
                type="number"
                placeholder="$250.00"
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <div className="flex flex-col gap-2">
              <Label>Product Picture</Label>
              <CropImageUploader onCallbackFormData={handleFormData} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Picture Preview</Label>
              <img
                src={imagePreview}
                alt="picture preview"
                className="w-[250px] h-full rounded-xl shadow"
              />
            </div>
          </div>
          <DialogClose onClick={handleFormSubmit} className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};
export default EmployeeAdd;
