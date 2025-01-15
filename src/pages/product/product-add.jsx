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
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getPcategory } from "@/app/reducer/pcategorySlicce";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const pcategories = useSelector((state) => state?.pcategories?.data);
  const [data, setData] = useState({
    product_name: "",
    product_code: "",
    product_category_id: 1,
    picture: "",
    price: 0,
    discount_rate: 0,
    status: "true",
  });

  useEffect(() => {
    if (!pcategories) dispatch(getPcategory());
  }, pcategories);

  console.log(pcategories);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/product-category", data)
      .then((res) => {
        console.log(res);
        dispatch(getPcategory());
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(data);
  };
  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Product Category Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <div className="flex flex-col gap-2">
              <Label>Product Category Name*</Label>
              <Input
                onChange={handleChange}
                name="category_name"
                type="text"
                placeholder="Food, Drink, ..."
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Category Code</Label>
              <Input
                onChange={handleChange}
                name="category_code"
                type="number"
                placeholder="CAT-001"
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <div className="flex flex-col gap-2">
              <Label>Product Category Name*</Label>
              <Select>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Product Category" />
                </SelectTrigger>
                <SelectContent>
                  {pcategories?.map((pcate) => (
                    <SelectItem
                      key={pcate.category_id}
                      value={pcate.category_id}
                    >
                      {pcate.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Product Category Code</Label>
              <Input
                onChange={handleChange}
                name="category_code"
                type="number"
                placeholder="CAT-001"
                className="w-[250px]"
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
export default ProductAdd;
