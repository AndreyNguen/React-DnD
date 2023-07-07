import React, { useState } from "react";

export default function ImageUploaderBase64() {
  const [image, setImage] = useState("");
  console.log("IMAGE", image);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      setImage(base64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {image ? (
        <>
          <img className="base64img" src={image} alt="" />
          <br />
          <button onClick={() => setImage("")}>Удалить</button>
        </>
      ) : (
        <input type="file" onChange={handleImageUpload} />
      )}
    </div>
  );
}
