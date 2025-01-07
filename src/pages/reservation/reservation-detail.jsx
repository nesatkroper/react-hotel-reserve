import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronsUpDown, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const ROOMS = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const ReservationDetails = () => {
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
  const [cmopen, setCMOpen] = useState(false);
  const [cmvalue, setCMValue] = useState("");
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservation Details Information.</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between mb-2">
          <div className="flex flex-col gap-2">
            <Label>Check-In Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Check-Out Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex flex-col gap-2">
            <Label>Rooms</Label>
            <Popover open={cmopen} onOpenChange={setCMOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={cmopen}
                  className="w-[240px] justify-between"
                >
                  {cmvalue
                    ? ROOMS.find((framework) => framework.value === cmvalue)
                        ?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {ROOMS.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setCMValue(
                              currentValue === cmvalue ? "" : currentValue
                            );
                            setCMOpen(false);
                          }}
                        >
                          {framework.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              cmvalue === framework.value
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
            <Label>Customer Name</Label>
            <Input
              name="customer_id"
              type="text"
              placeholder="anonymous"
              className="w-[240px]"
            />
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex flex-col gap-2">
            <Label>Number of Adults</Label>
            <Input
              name="adults"
              type="number"
              placeholder="1"
              className="w-[240px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Number of Children</Label>
            <Input
              name="children"
              type="number"
              placeholder="0"
              className="w-[240px]"
            />
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex flex-col gap-2">
            <Label>Payment Method</Label>
            <Select>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Cash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="khqr">KHQR</SelectItem>
                <SelectItem value="credit card">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Payment Status</Label>
            <Select>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Pending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="panding">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between mb-2">
          <Label>Memo</Label>
          <Textarea value="null" />
        </div>
        <Button type="button">Submit Check</Button>
      </DialogContent>
    </>
  );
};

export default ReservationDetails;
