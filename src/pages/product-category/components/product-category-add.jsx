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
import {
  imgFormData,
  resizeCropImage,
  defimg,
} from "@/utils/resize-crop-image";

const ProductCategoryAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);
  const [formData, setFormData] = useState({
    picture: "",
    category_name: "",
    category_code: 0,
    memo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      category_code: lastCode + 1,
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
      .post("/product-category", imgFormData(formData))
      .then(() => {
        dispatch(getPcategory());
      })
      .catch((error) => {
        console.log("Error submitting form:", error);
      });

    return imgFormData(formData);
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
                value={`CATE-${(lastCode + 1).toString().padStart(3, "0")}`}
                readOnly
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between mb-2">
            <Label>Description</Label>
            <Textarea
              onChange={handleChange}
              name="memo"
              placeholder="Something ..."
            />
          </div>
          <div className="flex justify-between my-3 ">
            <div className="flex flex-col gap-2">
              <Label>Choose Image*</Label>
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

export default ProductCategoryAdd;
