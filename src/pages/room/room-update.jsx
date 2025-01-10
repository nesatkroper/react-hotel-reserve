import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch } from "react-redux";
import { getRooms } from "@/app/reducer/roomSlice";

const RoomUpdate = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    room_name: "",
    room_type: "single",
    is_ac: "true",
    price: 0,
    capacity: 4,
    size: 25,
    discount_rate: 0,
    is_booked: "false",
    status: "available",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/room", data)
      .then((res) => {
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
            <div className="flex flex-col gap-2">
              <Label>Room Number*</Label>
              <Input
                onChange={handleChange}
                name="room_name"
                type="number"
                placeholder="Room-101"
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Type*</Label>
              <Select
                onValueChange={(value) =>
                  setData({ ...data, room_type: value })
                }
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Single Room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Room</SelectItem>
                  <SelectItem value="double">Double Room</SelectItem>
                  <SelectItem value="suite">Suite Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Label>Room Price*</Label>
              <Input
                onChange={handleChange}
                name="price"
                type="number"
                placeholder="$39,99"
                className="w-[250px]"
                step="0.01"
                min="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Discount Rate*</Label>
              <Input
                onChange={handleChange}
                name="discount_rate"
                type="number"
                placeholder="5%"
                className="w-[250px]"
                step="0.01"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Label>Room Size*</Label>
              <Input
                onChange={handleChange}
                name="size"
                type="number"
                placeholder="25 m²"
                className="w-[250px]"
                min="0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Capacity*</Label>
              <Input
                onChange={handleChange}
                name="capacity"
                type="number"
                placeholder="4 people"
                className="w-[250px]"
                min="1"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Label>Air Conditional*</Label>
              <RadioGroup
                onValueChange={(value) => setData({ ...data, is_ac: value })}
                defaultValue="true"
                className="flex pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

export default RoomUpdate;
