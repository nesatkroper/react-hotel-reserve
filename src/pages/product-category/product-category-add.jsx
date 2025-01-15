import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch } from "react-redux";
import { getPcategory } from "@/app/reducer/pcategorySlicce";
const ProductCategoryAdd = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    category_name: "",
    category_code: "",
    memo: "",
  });
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
          <div className="flex flex-col gap-2 justify-between mb-2">
            <Label>Room Price*</Label>
            <Textarea
              onChange={handleChange}
              name="memo"
              placeholder="Something ..."
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
export default ProductCategoryAdd;
