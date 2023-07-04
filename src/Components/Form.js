import React, { useState } from "react";
import "../App.css";

function Form() {
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("width", 500);
    img.setAttribute("height", 500);
    const divImg = document.createElement("div");
    divImg.classList.add("divImg");
    divImg.appendChild(img);
    const container = document.querySelector(".board");
    container.appendChild(divImg);
  };

  const handleChange = (e) => {
    setImage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          id="form"
          type="text"
          className="loadMap"
          value={image}
          onChange={handleChange}
          placeholder="Let's loading a map"
        />
      </label>
      <button type="submit" className="btn">
        Ok
      </button>
    </form>
  );
}

export default Form;
