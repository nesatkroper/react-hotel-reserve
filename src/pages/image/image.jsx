import Layout from "@/components/app/layout";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImageUtils";
import { v4 as uuidv4 } from "uuid";
import { useState, useCallback } from "react";

const Image = () => {
  const [imageSrc, setImageSrc] = useState(null); // The uploaded image
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1); // Default: 1x1
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // Handle image upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle aspect ratio change
  const handleAspectChange = (e) => {
    const value = e.target.value;
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
      case "3x6":
        setAspect(3 / 6);
        break;
      case "6x3":
        setAspect(6 / 3);
        break;
      default:
        setAspect(1 / 1);
    }
  };

  // Get cropped area
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Generate the cropped image
  // const generateCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
  //     setCroppedImage(croppedImage);
  //     console.log("Cropped image generated:", croppedImage);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [imageSrc, croppedAreaPixels]);

  const generateCroppedImage = useCallback(async () => {
    try {
      // Define output dimensions based on the aspect ratio
      let outputWidth = 640;
      let outputHeight = 640;

      switch (aspect) {
        case 1 / 1: // 1x1
          outputWidth = 640;
          outputHeight = 640;
          break;
        case 2 / 3: // 2x3
          outputWidth = 640;
          outputHeight = 960;
          break;
        case 3 / 2: // 3x2
          outputWidth = 960;
          outputHeight = 640;
          break;
        case 3 / 6: // 3x6
          outputWidth = 640;
          outputHeight = 1280;
          break;
        case 6 / 3: // 6x3
          outputWidth = 1280;
          outputHeight = 640;
          break;
        default:
          outputWidth = 640;
          outputHeight = 640;
      }

      // Get the cropped and resized image
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        outputWidth,
        outputHeight
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, aspect]);

  return (
    <Layout>
      <div>
        <h2>Image Upload and Crop</h2>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>

        <div>
          <label>Select Aspect Ratio:</label>
          <select onChange={handleAspectChange}>
            <option value="1x1">1:1</option>
            <option value="2x3">2:3</option>
            <option value="3x2">3:2</option>
            <option value="3x6">3:6</option>
            <option value="6x3">6:3</option>
          </select>
        </div>

        {imageSrc && (
          <div style={{ position: "relative", height: "400px", width: "100%" }}>
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

        <div>
          <button onClick={generateCroppedImage}>Crop Image</button>
        </div>

        {croppedImage && (
          <div>
            <h3>Cropped Image:</h3>
            <img
              src={croppedImage}
              alt="Cropped"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Image;

// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// import { getCroppedImg } from "./cropImageUtils";
// import { v4 as uuidv4 } from "uuid";

// const ImageUploader = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [aspect, setAspect] = useState(1 / 1); // Default: 1x1
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setImageSrc(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAspectChange = (e) => {
//     const value = e.target.value;
//     switch (value) {
//       case "1x1":
//         setAspect(1 / 1);
//         break;
//       case "2x3":
//         setAspect(2 / 3);
//         break;
//       case "3x2":
//         setAspect(3 / 2);
//         break;
//       case "3x6":
//         setAspect(3 / 6);
//         break;
//       case "6x3":
//         setAspect(6 / 3);
//         break;
//       default:
//         setAspect(1 / 1);
//     }
//   };

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const generateCroppedImage = useCallback(async () => {
//     try {
//       let outputWidth = 640;
//       let outputHeight = 640;

//       switch (aspect) {
//         case 1 / 1:
//           outputWidth = 640;
//           outputHeight = 640;
//           break;
//         case 2 / 3:
//           outputWidth = 640;
//           outputHeight = 960;
//           break;
//         case 3 / 2:
//           outputWidth = 960;
//           outputHeight = 640;
//           break;
//         case 3 / 6:
//           outputWidth = 640;
//           outputHeight = 1280;
//           break;
//         case 6 / 3:
//           outputWidth = 1280;
//           outputHeight = 640;
//           break;
//         default:
//           outputWidth = 640;
//           outputHeight = 640;
//       }

//       const croppedImage = await getCroppedImg(
//         imageSrc,
//         croppedAreaPixels,
//         outputWidth,
//         outputHeight
//       );
//       setCroppedImage(croppedImage);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels, aspect]);

//   return (
//     <div>
//       <h2>Image Upload and Crop</h2>
//       <input type="file" accept="image/*" onChange={handleFileUpload} />

//       <select onChange={handleAspectChange}>
//         <option value="1x1">1:1</option>
//         <option value="2x3">2:3</option>
//         <option value="3x2">3:2</option>
//         <option value="3x6">3:6</option>
//         <option value="6x3">6:3</option>
//       </select>

//       {imageSrc && (
//         <div style={{ position: "relative", height: "400px", width: "100%" }}>
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             aspect={aspect}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropComplete}
//           />
//         </div>
//       )}

//       <button onClick={generateCroppedImage}>Crop Image</button>

//       {croppedImage && (
//         <div>
//           <h3>Cropped Image:</h3>
//           <img src={croppedImage} alt="Cropped" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;
