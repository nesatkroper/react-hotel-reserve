import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCroppedImg } from "@/utils/crop-image";
import { defimg } from "@/utils/resize-crop-image";
import axiosInstance from "@/providers/axiosInstance";

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(defimg);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAspectChange = (value) => {
    switch (value) {
      case "1x1":
        setAspect(1 / 1);
        break;
      case "2x3":
        setAspect(2 / 3);
        break;
      case "3x2":
        setAspect(3 / 2);
        break;
      default:
        setAspect(1 / 1);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const generateCroppedImage = useCallback(async () => {
    try {
      let outputWidth = 600;
      let outputHeight = 600;

      switch (aspect) {
        case 1 / 1:
          outputWidth = 600;
          outputHeight = 600;
          break;
        case 2 / 3:
          outputWidth = 400;
          outputHeight = 600;
          break;
        case 3 / 2:
          outputWidth = 600;
          outputHeight = 400;
          break;
        default:
          outputWidth = 600;
          outputHeight = 600;
      }

      const cropped = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        outputWidth,
        outputHeight
      );
      console.log("Cropped image:", cropped);
      return cropped;
    } catch (e) {
      console.log("Error generating cropped image:", e);
      throw e;
    }
  }, [imageSrc, croppedAreaPixels, aspect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      const cropped = await generateCroppedImage();
      console.log("Cropped image:", cropped);
      if (!cropped) {
        throw new Error("Cropped image is null or undefined");
      }

      // const blob = await fetch(cropped).then((res) => res.blob());

      formData.append("picture", cropped, "cropped-image.jpg");
      console.log("Uploading image:", formData.get("picture"));
      const response = await axiosInstance.post("/img", formData);

      console.log("Image uploaded successfully:", response, formData);
    } catch (err) {
      console.log("Error uploading image:", err);
    }
  };

  return (
    <AlertDialog>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[300px] m-4"
      >
        <Label htmlFor="email">Select Picture</Label>{" "}
        <AlertDialogTrigger>
          <Input type="file" accept="image/*" onChange={handleFileUpload} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Crop Your Picture:</AlertDialogTitle>
          </AlertDialogHeader>
          <Separator />
          <RadioGroup
            onValueChange={handleAspectChange}
            defaultValue="1x1"
            className="flex justify-between"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1x1" id="1x1" />
              <Label htmlFor="1x1">Aspect Ratio 1:1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2x3" id="2x3" />
              <Label htmlFor="2x3">Aspect Ratio 2:3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3x2" id="3x2" />
              <Label htmlFor="3x2">Aspect Ratio 3:2</Label>
            </div>
          </RadioGroup>
          <Separator />
          {imageSrc && (
            <div
              style={{
                position: "relative",
                height: "400px",
                width: "100%",
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={handleSubmit}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
};

export default ImageUploader;
