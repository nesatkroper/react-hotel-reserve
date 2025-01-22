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
import axiosInstance from "@/providers/axiosInstance";
import { getPositions } from "@/app/reducer/positionSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const PositionDialog = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    position_name: "",
    position_code: 0,
    memo: "",
  });

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

export default PositionDialog;
