import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import Item from "./Item.js";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import Image from "../img/example.jpeg";

import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AssistWalkerOutlinedIcon from "@mui/icons-material/AssistWalkerOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import ImageUploaderBase64 from "./ImageUploaderBase64.js";

export default function Board() {
  const [board, setBoard] = useState({
    a: { top: 0, left: 0, el: <AddLocationOutlinedIcon /> },
    b: { top: 40, left: 0, el: <AddCommentOutlinedIcon /> },
    c: { top: 80, left: 0, el: <AbcOutlinedIcon /> },
    d: { top: 120, left: 0, el: <AssistWalkerOutlinedIcon /> },
    e: { top: 160, left: 0, el: <AttachFileOutlinedIcon /> },
    f: { top: 200, left: 0, el: <PrintOutlinedIcon /> },
    g: { top: 240, left: 0, el: <QrCodeScannerOutlinedIcon /> },
    h: { top: 280, left: 0, el: <AppsOutlinedIcon /> },
    r: { top: 320, left: 0, el: <NearMeOutlinedIcon /> },
  });

  console.log("BOARD", board);

  const moveBox = useCallback(
    (id, left, top) => {
      if (id.length === 1) {
        const newId = uuidv4();
        const updatedBoard = (prevBoard) => ({
          ...board,
          [newId]: {
            top,
            left,
            el: prevBoard[id].el,
            newId: newId,
          },
        });
        setBoard(updatedBoard);
      } else {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [id]: {
            ...prevBoard[id],
            top,
            left,
          },
        }));
      }
    },
    [board]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ICON,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [moveBox]
  );

  return (
    <>
      <div className="container">
        <div
          className="items"
          style={{
            opacity: isOver ? 0.5 : 1,
          }}
        >
          {Object.keys(board).map((key) => {
            const { left, top, el, newId } = board[key];
            return (
              <Item
                key={key}
                id={key}
                newId={newId}
                left={left}
                top={top}
                el={el}
              >
                {el}
              </Item>
            );
          })}
        </div>

        <div className="board" ref={drop}>
          <img alt="" width={"300px"} src={Image} />
        </div>
      </div>
      <ImageUploaderBase64 />
    </>
  );
}
