import defimg from "@/assets/images/default.png";
import { apiUrl } from "@/providers/api-url";

const local = apiUrl.split("/api").join("");

export { defimg, local };

export const resizeCropImage = (file, callback, aspect) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        //! CALCULATE DIMENSIONS FOR 3:2 ASPECT RATIO
        const aspectRatio = aspect;
        let targetWidth = img.width;
        let targetHeight = img.height;

        if (targetWidth / targetHeight > aspectRatio) {
          targetWidth = targetHeight * aspectRatio;
        } else {
          targetHeight = targetWidth / aspectRatio;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        context.drawImage(
          img,
          (img.width - targetWidth) / 2,
          (img.height - targetHeight) / 2,
          targetWidth,
          targetHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );

        callback(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const imgFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "picture" && data[key] instanceof Blob)
      formData.append(key, data[key], "image.jpg");
    else formData.append(key, data[key]);
  });

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  return formData;
};
