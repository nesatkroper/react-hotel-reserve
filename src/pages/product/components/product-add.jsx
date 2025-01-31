import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/app/reducer/product-slice";
import { getPcategory } from "@/app/reducer/product-category-slice";
import { defimg } from "@/utils/resize-crop-image";
import CropImageUploader from "@/components/app/utils/crop-image-uploader";
import PropTypes from "prop-types";
import FormInput from "@/components/app/form/form-input";
import FormComboBox from "@/components/app/form/form-combobox";
import FormImagePreview from "@/components/app/form/form-image-preview";
import axiosInstance from "@/providers/axiosInstance";

const ProductAdd = ({ lastCode }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);
  const { pcaData } = useSelector((state) => state?.pcategories);
  const [formData] = useState(() => {
    const form = new FormData();
    form.append("product_name", "");
    form.append("product_code", 0);
    form.append("product_category_id", 1);
    form.append("picture", "");
    form.append("price", 0);
    form.append("discount_rate", 0);
    form.append("status", "true");
    return form;
  });

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  const handleFormData = (event) => {
    if (event instanceof FormData) {
      for (let [key, value] of event.entries()) {
        formData.set(key, value);
      }

      if (event.has("picture")) {
        const file = event.get("picture");
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else if (event?.target) {
      const { name, value } = event.target;
      formData.set(name, value);
      formData.set("product_code", Number(lastCode) + 1);
    } else if (Number(event) > 0) {
      console.log(event);
      formData.set("product_category_id", event);
    } else {
      console.log("Unexpected event structure:", event);
    }

    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await axiosInstance
        .post("/products", formData)
        .then((res) => {
          console.log(res);
          dispatch(getProduct());
        })
        .catch((error) => {
          console.log("Error submitting form:", error);
        });
    } catch (err) {
      console.log(err);
    }
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
            <FormInput
              onCallbackInput={handleFormData}
              label="Product Name*"
              name="product_name"
              type="text"
            />
            <FormInput
              label="Product Code"
              readonl={true}
              value={`PROD-${(lastCode + 1).toString().padStart(5, "0")}`}
            />
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <FormComboBox
              onCallbackSelect={handleFormData}
              label="Category*"
              item={pcaData}
              optID="product_category_id"
              optLabel="category_name"
            />
            <FormInput
              onCallbackInput={handleFormData}
              label="Price*"
              name="price"
              type="number"
              placeholder="$ 39.99"
            />
          </div>
          <div className="flex justify-between mb-2 mt-3">
            <FormInput
              onCallbackInput={handleFormData}
              label="Discount Rate*"
              name="discount_rate"
              type="number"
              placeholder="5 %"
              step={1}
            />
            <div className="flex flex-col gap-2">
              <Label>Chose Image*</Label>
              <CropImageUploader onCallbackFormData={handleFormData} />
            </div>
          </div>
          <FormImagePreview imgSrc={imagePreview} />
          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

ProductAdd.propTypes = {
  lastCode: PropTypes.number.isRequired,
};

ProductAdd.defualtProps = { lastCode: 0 };

export default ProductAdd;
