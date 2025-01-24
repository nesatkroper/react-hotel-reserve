import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const FormDatePicker = (props) => {
  const {
    onCallbackInput,
    mainClass,
    labelClass,
    size = "w-[250px] ",
    label = "Date of Birth*",
  } = props;
  const [date, setDate] = useState();

  const handlePicker = () => {
    onCallbackInput(date);
  };
  return (
    <div className={`flex flex-col gap-2 ${mainClass}`}>
      <Label className={labelClass}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              `${size} justify-start text-left font-normal`,
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FormDatePicker;
