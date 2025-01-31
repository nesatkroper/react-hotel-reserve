import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "@/app/reducer/room-slice";
import { getRpicture } from "@/app/reducer/room-picture-slice";
import { defimg } from "@/utils/resize-crop-image";
import axios from "@/providers/axiosInstance";
import OriCropImageUploader from "@/components/app/utils/ori-crop-image-uploader";
import FormComboBox from "@/components/app/form/form-combobox";
import FormInput from "@/components/app/form/form-input";
import FormImagePreview from "@/components/app/form/form-image-preview";

const RoomPictureAdd = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);
  const { rooData } = useSelector((state) => state?.rooms);
  const [formData] = useState(() => {
    const form = new FormData();
    form.append("room_id", 0);
    form.append("picture_name", 1);
    form.append("picture", "");
    return form;
  });

  useEffect(() => {
    dispatch(getRooms());
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
      // formData.set("product_code", Number(lastCode) + 1);
    } else if (Number(event) > 0) {
      console.log(event);
      formData.set("room_id", event);
    } else {
      console.log("Unexpected event structure:", event);
    }

    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    await axios
      .post("/room-picture", formData)
      .then((res) => {
        console.log(res);
        dispatch(getRpicture());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Room Picture Information.</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex justify-between mb-3 mt-2">
            <FormComboBox
              onCallbackSelect={handleFormData}
              label="Room Name*"
              item={rooData}
              optID="room_id"
              optLabel="room_name"
            />
            <FormInput
              onCallbackInput={handleFormData}
              name="picture_name"
              label="Picture Name*"
              placeholder="N/A"
              type="text"
            />
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Chosing Image</Label>
              <OriCropImageUploader onCallbackFormData={handleFormData} />
            </div>
            <FormImagePreview imgSrc={imagePreview} />
          </div>

          <DialogClose className="mt-2">
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </>
  );
};

export default RoomPictureAdd;
