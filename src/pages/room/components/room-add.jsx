import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRooms } from "@/app/reducer/room-slice";
import axiosInstance from "@/providers/axiosInstance";
import FormInput from "@/components/app/form/form-input";
import FormSelect from "@/components/app/form/form-select";
import FormRatio from "@/components/app/form/form-ratio";

const roomType = [
  { value: "single", data: "Single Room" },
  { value: "double", data: "Double Room" },
  { value: "suite", data: "Suite Room" },
];

const RoomAdd = () => {
  const dispatch = useDispatch();
  const [formData] = useState(() => {
    const form = new FormData();
    form.append("room_name", "");
    form.append("room_type", "single");
    form.append("is_ac", true);
    form.append("size", 25);
    form.append("price", 0);
    form.append("capacity", 4);
    form.append("is_booked", false);
    form.append("discount_rate", 0);
    form.append("status", "available");
    return form;
  });

  const handleFormData = (event) => {
    if (event instanceof FormData) {
      for (let [key, value] of event.entries()) {
        formData.set(key, value);
      }
    } else if (event?.target) {
      const { name, value } = event.target;
      formData.set(name, value);
    } else if (event) {
      console.log(event);
      formData.set("room_type", event);
    } else {
      console.log("Unexpected event structure:", event);
    }

    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/room", formData)
      .then(() => {
        dispatch(getRooms());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Reservation Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <FormInput
              onCallbackInput={handleFormData}
              name="room_name"
              type="number"
              placeholder="Room-101"
              label="Room Number*"
            />
            <FormSelect
              onCallbackSelect={handleFormData}
              item={roomType}
              label="Room Type"
              placeholder="Select Room Type"
            />
          </div>
          <div className="flex justify-between mb-2">
            <FormInput
              onCallbackInput={handleFormData}
              name="price"
              type="number"
              placeholder="$39,99"
              label="Price*"
            />
            <FormInput
              onCallbackInput={handleFormData}
              name="discount_rate"
              type="number"
              placeholder="5 %"
              label="Discount Rate*"
              step={1}
            />
          </div>
          <div className="flex justify-between mb-2">
            <FormInput
              onCallbackInput={handleFormData}
              name="size"
              type="number"
              placeholder="25 m²"
              label="Room Size*"
              step={1}
            />
            <FormInput
              onCallbackInput={handleFormData}
              name="capacity"
              type="number"
              placeholder="4 people"
              label="Room Capacity*"
              step={1}
            />
          </div>
          <div className="flex justify-between mb-2">
            <FormRatio onCallbackSelect={handleFormData} />
          </div>
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

export default RoomAdd;
