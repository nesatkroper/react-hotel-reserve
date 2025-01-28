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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCroppedImg } from "@/utils/crop-image";
import { defimg } from "@/utils/resize-crop-image";
import { Button } from "@/components/ui/button";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";

const FormImageOriginal = ({ onCallbackFormData }) => {
  const [imageSrc, setImageSrc] = useState(defimg);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
      case "16x9":
        setAspect(16 / 9);
        break;
      case "20x10":
        setAspect(20 / 10);
        break;
      case "21x9":
        setAspect(21 / 9);
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
      const original = new Image();
      original.src = imageSrc;

      await new Promise((resolve, reject) => {
        original.onload = resolve;
        original.onerror = reject;
      });

      const originalWidth = original.naturalWidth;
      const originalHeight = original.naturalHeight;

      let outputWidth = originalWidth;
      let outputHeight = originalHeight;

      if (aspect === 1 / 1) {
        const size = Math.min(originalWidth, originalHeight);
        outputWidth = size;
        outputHeight = size;
      } else if (aspect === 2 / 3) {
        if (originalWidth / originalHeight > 2 / 3) {
          outputHeight = originalHeight;
          outputWidth = (originalHeight * 2) / 3;
        } else {
          outputWidth = originalWidth;
          outputHeight = (originalWidth * 3) / 2;
        }
      } else if (aspect === 3 / 2) {
        if (originalWidth / originalHeight > 3 / 2) {
          outputHeight = originalHeight;
          outputWidth = (originalHeight * 3) / 2;
        } else {
          outputWidth = originalWidth;
          outputHeight = (originalWidth * 2) / 3;
        }
      }

      const cropped = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        outputWidth,
        outputHeight
      );
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
      if (!cropped) {
        throw new Error("Cropped image is null or undefined");
      }

      formData.append("picture", cropped, "cropped-image.jpg");
      onCallbackFormData(formData);
    } catch (err) {
      console.log("Error uploading image:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[250px]">
      <AlertDialog>
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
              <Label htmlFor="1x1">1 : 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3x2" id="3x2" />
              <Label htmlFor="3x2">3 : 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2x3" id="2x3" />
              <Label htmlFor="2x3">2 : 3</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="16x9" id="16x9" />
              <Label htmlFor="16x9" className="font-bold">
                16 : 9
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="20x10" id="20x10" />
              <Label htmlFor="20x10" className="font-bold">
                20 : 10
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="21x9" id="21x9" />
              <Label htmlFor="21x9" className="font-bold">
                21 : 9
              </Label>
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
            <Button onClick={handleSubmit} className="p-0">
              <AlertDialogAction>Continue</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

FormImageOriginal.propTypes = {
  onCallbackFormData: PropTypes.func,
};

export default FormImageOriginal;
