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
          const fileUrl = URL.createObjectURL(blob);
          resolve(fileUrl);
        },
        "image/jpeg",
        1 // Quality (1 = best quality)
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};
