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
import PropTypes from "prop-types";

const FormDatePicker = (props) => {
  const {
    onCallbackPicker,
    mainClass,
    labelClass,
    size = 250,
    label = "Date of Birth*",
  } = props;
  const [date, setDate] = useState(null);

  const handlePicker = (event) => {
    setDate(event);
    if (onCallbackPicker) {
      onCallbackPicker(event);
    }
  };
  return (
    <div className={`flex flex-col gap-2 ${mainClass}`}>
      <Label className={labelClass}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              `w-[${size}px] justify-start text-left font-normal`,
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
            onSelect={handlePicker}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

FormDatePicker.propTypes = {
  onCallbackPicker: PropTypes.func,
  mainClass: PropTypes.string,
  labelClass: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string,
};

export default FormDatePicker;
