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
import { useDispatch } from "react-redux";
import { getPcategory } from "@/app/reducer/pcategorySlicce";
import { defimg } from "@/utils/resize-crop-image";
import CropImageUploader from "@/components/app/utils/crop-image-uploader";
import axiosInstance from "@/providers/axiosInstance";
import FormInput from "@/components/app/form/form-input";
import FormSelect from "@/components/app/form/form-select";
import FormDatePicker from "@/components/app/form/form-date-picker";
import { format } from "date-fns";
import FormTextArea from "@/components/app/form/form-textarea";

const ProductCategoryAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);
  const [formData, setFormData] = useState(() => {
    const form = new FormData();
    form.append("picture", "");
    form.append("category_name", "");
    form.append("category_code", lastCode + 1);
    form.append("memo", "");
    return form;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    formData.set(name, value);
    formData.set("category_code", lastCode + 1);
  };

  const handleFormData = (data) => {
    for (let [key, value] of data.entries()) {
      formData.set(key, value);
    }

    if (data.has("picture")) {
      const file = data.get("picture");
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }

    return formData;
  };

  const handleInputChange = (data) => {
    const { name, value } = data;
    console.log(`${name}: ${value}`);
  };

  const handleSelectChange = (data) => {
    const value = data;
    console.log(`${value}`);
  };

  const handleDateChange = (date) => {
    console.log(format(date, "yyyy-MM-dd"));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post("/product-category", formData)
      .then(() => {
        dispatch(getPcategory());
      })
      .catch((error) => {
        console.log("Error submitting form:", error);
      });
  };

  const demo = [
    {
      value: "male",
      data: "Male",
    },
    {
      value: "female",
      data: "Female",
    },
  ];

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle>Product Category Details Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-2 mt-2">
            <FormInput
              onCallbackInput={handleInputChange}
              label="Product Category Name*"
              name="category_name"
              type="text"
            />
            {/* <div className="flex flex-col gap-2">
              <Label>Product Category Name*</Label>
              <Input
                onChange={handleChange}
                name="category_name"
                type="text"
                placeholder="Food, Drink, ..."
                className="w-[250px]"
              />
            </div> */}
            <div className="flex flex-col gap-2">
              <Label>Product Category Code</Label>
              <Input
                value={`CATE-${(lastCode + 1).toString().padStart(3, "0")}`}
                readOnly
                className="w-[250px]"
              />
            </div>
          </div>
          {/* <div className="flex flex-col gap-2 justify-between mb-2">
            <Label>Description</Label>
            <Textarea
              onChange={handleChange}
              name="memo"
              placeholder="Something ..."
            />
          </div> */}
          <FormTextArea onCallbackInput={handleInputChange} />
          <div className="flex justify-between my-3 ">
            <div className="flex flex-col gap-2">
              <Label>Choose Image*</Label>
              <CropImageUploader onCallbackFormData={handleFormData} />
            </div>
            {/* <div className="flex flex-col gap-2">
              <Label>Picture Preview</Label>
              <img
                src={imagePreview}
                alt="picture preview"
                className="w-[250px] rounded-xl shadow"
              />
            </div> */}
          </div>
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
        <FormSelect onCallbackSelect={handleSelectChange} item={demo} />
        <FormDatePicker onCallbackPicker={handleDateChange} />
      </DialogContent>
    </>
  );
};

export default ProductCategoryAdd;
