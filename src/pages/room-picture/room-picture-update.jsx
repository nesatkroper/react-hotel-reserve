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
import testPic from "@/public/images/test.jpg";
import { getRooms } from "@/app/reducer/roomSlice";
import { getRpicture } from "@/app/reducer/rpictureSlice";

const RoomPictureUpdate = ({ optionID }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [imagePreview, setImagePreview] = useState(testPic);
  const rooms = useSelector((state) => state?.rooms?.data);
  const [data, setData] = useState({
    room_id: 0,
    picture_name: "",
    picture: "",
  });

  useEffect(() => {
    if (!rooms) dispatch(getRooms());
  });

  const handleGetSpecificData = async () => {
    await axios
      .get(`/room-picture/${optionID}`)
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
    setData({ ...data, picture: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/room-picture", data)
      .then(() => {
        dispatch(getRpicture());
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
          <div className="flex justify-between mb-3 mt-2">
            <div className="flex flex-col gap-2">
              <Label>Room Number*</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                  >
                    {value
                      ? rooms?.find((room) => room?.room_id === value)
                          ?.room_name
                      : "Select Room Number..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search room..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Room found.</CommandEmpty>
                      <CommandGroup>
                        {rooms?.map((room) => (
                          <CommandItem
                            key={room.room_id}
                            value={room.room_id}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setData({ ...data, room_id: room.room_id });
                              setOpen(false);
                            }}
                          >
                            {room?.room_name}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === room.room_id
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
              <Label>Picture Name*</Label>
              <Input
                onChange={handleChange}
                name="picture_name"
                type="text"
                placeholder="N/A"
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Chosing Image*</Label>
              <Input
                onChange={handleImageChange}
                name="picture"
                type="file"
                className="w-[250px]"
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Picture Preview</Label>
              <img
                src={imagePreview}
                alt="picture preview"
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

export default RoomPictureUpdate;
