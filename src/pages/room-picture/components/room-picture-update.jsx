import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "@/providers/axiosInstance";
import { useDispatch } from "react-redux";
import { getRpicture } from "@/app/reducer/room-picture-slice";
import {
  defimg,
  imgFormData,
  local,
  resizeCropImage,
} from "@/utils/resize-crop-image";

const RoomPictureUpdate = ({ item }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(defimg);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({ ...item });
    setImagePreview(`${local}/images/rooms/${item.picture}`);
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      .put(`/room-picture/${formData.room_picture_id}`, imgFormData(formData))
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
            <div className="flex flex-col gap-2">
              <Label>Room Number*</Label>
              <Input
                readOnly
                className="w-[250px]"
                value={`ROOM-00${formData?.room_id}`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Picture Name*</Label>
              <Input
                onChange={handleChange}
                name="picture_name"
                type="text"
                value={formData.picture_name || "Unnamed"}
                className="w-[250px]"
              />
            </div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="flex flex-col gap-2">
              <Label>Chosing Image*</Label>
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

export default RoomPictureUpdate;
