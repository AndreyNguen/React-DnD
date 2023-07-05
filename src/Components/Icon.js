import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";

function Icon({ id, left, top, el }) {
  const [isDragging, drag] = useDrag(() => ({
    type: ItemTypes.ICON,
    item: {
      id,
      left,
      top,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    border: "1px solid black",
    borderRadius: "50px",
    backgroundColor: isDragging ? "lightBlue" : "lightRed",
    width: "30px",
    height: "30px",
    cursor: "grab",
  };

  return (
    <div className="icon" ref={drag} style={{ ...style, id, left, top }}>
      {el}
    </div>
  );
}

export default Icon;
