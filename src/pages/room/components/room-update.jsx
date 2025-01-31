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
import { useEffect, useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch } from "react-redux";
import { getRooms } from "@/app/reducer/room-slice";

const RoomUpdate = ({ item }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  useEffect(() => {
    setData(item);
  }, [item]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    await axios
      .put(`/room/${data.room_id}`, data)
      .then((res) => {
        // console.log(res);
        dispatch(getRooms());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Update Reservation Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>Room Number*</Label>
              <Input
                onChange={handleChange}
                name="room_name"
                type="number"
                value={data?.room_name?.split("-")[1] || ""}
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Type*</Label>
              <Select
                onValueChange={(value) =>
                  setData({ ...data, room_type: value })
                }
                value={data?.room_type}
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
                value={
                  typeof data?.price === "string"
                    ? data.price.replace("$", "").trim() || 0
                    : data.price
                }
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
                value={data.discount_rate}
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
                value={data.size}
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
                value={data.capacity}
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
                value={data?.is_ac}
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
