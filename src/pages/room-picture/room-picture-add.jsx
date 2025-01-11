import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/app/reducer/roomSlice";
import testPic from "../../../public/test.jpg";

const RoomPictureAdd = () => {
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState([]);
  const rooms = useSelector((state) => state?.rooms?.data);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState({
    room_id: 0,
    picture_name: "",
    picture: "true",
  });

  useEffect(() => {
    if (!rooms) dispatch(getRooms());
    setRoomName(rooms);
  }, [rooms]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/room", data)
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
          <DialogHeader className="mb-4">
            <DialogTitle>Room Picture Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Room Price*</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                  >
                    {value
                      ? roomName.find((framework) => framework.value === value)
                          ?.label
                      : "Select room..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search rooms..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No rooms found.</CommandEmpty>
                      <CommandGroup>
                        {roomName.map((room) => (
                          <CommandItem
                            key={room.room_id}
                            value={room.room_id.toString()}
                            onSelect={(currentValue) => {
                              const selectedRoom = rooms.find(
                                (room) =>
                                  room.room_id.toString() === currentValue
                              );
                              setValue(selectedRoom?.label || "");
                              setData({
                                ...data,
                                room_id: selectedRoom?.room_id || 0,
                              });
                              setOpen(false);
                            }}
                          >
                            {room.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === room.label
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
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Chosing Image*</Label>
              <Input
                onChange={handleChange}
                name="size"
                type="file"
                className="w-[250px]"
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Picture Preview</Label>
              <img
                src={testPic}
                alt="picture"
                className="w-[250px] rounded-xl shadow"
              />
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

export default RoomPictureAdd;
