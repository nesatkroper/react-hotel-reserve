import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const RoomDialog = () => {
  return (
    <>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservation Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Label>Room Number*</Label>
              <Input
                name="room_name"
                type="number"
                placeholder="Room-101"
                className="w-[250px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Type*</Label>
              <Select required>
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
                name="price"
                type="number"
                placeholder="$39,99"
                className="w-[250px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Discount Rate*</Label>
              <Input
                name="discount"
                type="number"
                placeholder="5%"
                className="w-[250px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Label>Room Size*</Label>
              <Input
                name="size"
                type="number"
                placeholder="25 m²"
                className="w-[250px]"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Room Capacity*</Label>
              <Input
                name="capacity"
                type="number"
                placeholder="4 people"
                className="w-[250px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex flex-col gap-2">
              <Label>Air Conditional*</Label>
              <RadioGroup defaultValue="true" className="flex pt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label>Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label>No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </DialogContent>
      </form>
    </>
  );
};

export default RoomDialog;
