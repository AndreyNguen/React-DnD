import React, { useState } from "react";

export default function ImageUploaderBase64() {
  const [image, setImage] = useState("");
  console.log("IMAGE", image);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Загруженное изображение" />}
    </div>
  );
}
