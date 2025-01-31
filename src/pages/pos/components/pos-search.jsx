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
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { getPcategory } from "@/app/reducer/product-category-slice";
import { getSearchCate } from "@/app/reducer/search-category-slice";
import OpenShift from "./open-shift";
import CloseShift from "./close-shift";

const POSSearch = ({ shift, setShift }) => {
  const { pcaData } = useSelector((state) => state?.pcategories);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState();

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <Label>Product Category</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[250px] justify-between"
              >
                {value
                  ? pcaData?.find(
                      (room) => String(room.product_category_id) === value
                    )?.category_name
                  : "All Category"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search product category..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No Product Category found.</CommandEmpty>

                  <CommandGroup>
                    {pcaData?.map((cate) => (
                      <CommandItem
                        key={cate.product_category_id}
                        onClick={() =>
                          console.log(String(cate.product_category_id))
                        }
                        value={String(cate.product_category_id)}
                        onSelect={(currentValue) => {
                          setValue(currentValue);
                          setOpen(false);
                          setData((prevData) => ({
                            ...prevData,
                            product_category_id: Number(currentValue),
                          }));
                        }}
                      >
                        {cate.category_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === cate.product_category_id
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
          <Label>Search Product</Label>
          <div className="flex gap-1">
            <Input
              type="text"
              name="search"
              className="w-[350px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your wish product here"
            />
            <Button onClick={() => dispatch(getSearchCate(4))}>
              <Search />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <AlertDialog>
          <AlertDialogTrigger disabled={shift ? true : false}>
            <Button disabled={shift ? true : false} className="bg-green-500">
              Open Shift
            </Button>
          </AlertDialogTrigger>
          <OpenShift setShift={setShift()} />
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger disabled={shift ? false : true}>
            <Button disabled={shift ? false : true} className="bg-red-500">
              Close Shift
            </Button>
          </AlertDialogTrigger>
          <CloseShift setShift={setShift()} />
        </AlertDialog>
      </div>
    </div>
  );
};

export default POSSearch;
