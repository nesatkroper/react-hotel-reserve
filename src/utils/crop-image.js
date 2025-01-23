export const getCroppedImg = (
  imageSrc,
  croppedAreaPixels,
  outputWidth,
  outputHeight
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      // Create a canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the desired output dimensions
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Draw the cropped image to the canvas and resize it
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Convert the canvas to a blob or data URL
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(
              new File([blob], "cropped-image.jpg", { type: "image/jpeg" })
            );
          } else {
            reject(new Error("Canvas is empty!"));
          }
        },
        "image/jpeg",
        1 // Image quality (1 = highest)
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};
