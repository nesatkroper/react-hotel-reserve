import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axiosInstance from "@/providers/axiosInstance";
import { useDispatch } from "react-redux";
import { getDepartments } from "@/app/reducer/department-slice";

const DepartmentAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    department_name: "",
    department_code: 0,
    memo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      department_code: lastCode + 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/department", formData)
      .then((res) => {
        console.log(res);
        dispatch(getDepartments());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(formData);
  return (
    <>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Department Details Information.</DialogTitle>
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
                value={formData.department_code}
                type="text"
                className="w-[250px]"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between mb-3">
            <Label>Decription</Label>
            <Textarea onChange={handleChange} name="memo" placeholder="N/A" />
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

export default DepartmentAdd;
