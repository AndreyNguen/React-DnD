import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  border: "0.5px solid black",
  width: "25px",
  height: "25px",
  borderRadius: "50px",
  backgroundColor: "lightBlue",
  cursor: "grab",
};

export default function Item({ id, left, top, el, newId }) {
  const [isDragging, setIsDragging] = useState(false);
  const [text, setText] = useState("");
  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.ICON,
      item: {
        id,
        left,
        top,
      },
      end: (item, monitor) => {
        const drop = monitor.getDropResult();
        if (drop) {
          setIsDragging(true);
        }
      },
    }),
    [id, left, top]
  );

  return (
    <div className="icon" ref={drag} style={{ ...style, left, top }}>
      {el}
      {isDragging && newId && (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      )}
    </div>
  );
}
