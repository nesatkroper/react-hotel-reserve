import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

const demo = [
  {
    time: "next.js",
    less: "Next.js",
  },
  {
    time: "sveltekit",
    less: "SvelteKit",
  },
];

const FormComboBox = (props) => {
  const {
    onCallbackSelect,
    optID = "time",
    optLabel = "less",
    labelClass,
    placeholder = "Search position category...",
    size = 250,
    label = "Email*",
    item = demo,
    defaultValue = "",
  } = props;

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(defaultValue);

  const filter = (item || []).map((d) => ({
    value: d[optID],
    label: d[optLabel],
  }));

  return (
    <div className="flex flex-col gap-2">
      <Label className={labelClass}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            style={{ width: `${size}px` }}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {data
              ? filter?.find((d) => String(d.value) === data)?.label
              : `Select ${label}...`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: `${size}px` }} className="p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              className="h-9"
              aria-label={`Search for ${label}`}
            />
            <CommandList>
              <CommandEmpty>No {label} found.</CommandEmpty>
              <CommandGroup>
                {filter?.map((d) => (
                  <CommandItem
                    key={d.value}
                    value={String(d.value)}
                    onSelect={(currentValue) => {
                      setData(currentValue);
                      setOpen(false);
                      onCallbackSelect?.(currentValue);
                    }}
                  >
                    {d.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        data === d.value ? "opacity-100" : "opacity-0"
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
  );
};

export default FormComboBox;
