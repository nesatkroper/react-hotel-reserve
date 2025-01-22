import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getPcategory } from "@/app/reducer/pcategorySlicce";
import {
  defimg,
  imgFormData,
  resizeCropImage,
} from "@/utils/resize-crop-image";

const ProductAdd = ({ lastCode }) => {
  console.log(lastCode);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [imagePreview, setImagePreview] = useState(defimg);
  const { pcaData } = useSelector((state) => state?.pcategories);

  const [formData, setFormData] = useState({
    product_name: "",
    product_code: 0,
    product_category_id: 1,
    picture: "",
    price: 0,
    discount_rate: 0,
    status: "true",
  });

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      product_code: lastCode + 1,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedImage = await resizeCropImage(
          file,
          setImagePreview,
          3 / 2
        );
        setFormData({ ...formData, picture: resizedImage });
      } catch (error) {
        console.error("Image processing error:", error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/products", imgFormData(formData))
      .then((res) => {
        console.log(res);
        dispatch(getProduct());
      })
      .catch((error) => {
        console.log("Error submitting form:", error);
      });
    console.log(formData);
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Product Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>Product Name*</Label>
              <Input
                onChange={handleChange}
                name="product_name"
                type="text"
                placeholder="Coca, Pepsi, ..."
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Category Code</Label>
              <Input
                value={`PROD-${(lastCode + 1).toString().padStart(5, "0")}`}
                readOnly
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <div className="flex flex-col gap-2">
              <Label>Product Category Name*</Label>
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
                          (cate) => String(cate.product_category_id) === value
                        )?.category_name
                      : "Select Product Category..."}
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
                            value={String(cate.product_category_id)}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
                              setOpen(false);
                              setFormData((prevData) => ({
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
              <Label>Product Category Code</Label>
              <Input
                onChange={handleChange}
                name="price"
                type="number"
                placeholder="$ 1.99"
                className="w-[250px]"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <div className="flex flex-col gap-2">
              <Label>Discount Rate*</Label>
              <Input
                onChange={handleChange}
                name="discount_rate"
                type="number"
                placeholder="5 %"
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Picture</Label>
              <Input
                onChange={handleImageChange}
                name="picture"
                type="file"
                className="w-[250px]"
                accept=".jpg,.jpeg,.png"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 my-3">
            <Label>Picture Preview</Label>
            <img
              src={imagePreview}
              alt="picture preview"
              className="w-[200px] rounded-xl shadow"
            />
          </div>
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};
export default ProductAdd;
