import React, { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
// import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes.js";

import Icon from "./Icon";
import "../App.css";

import AddLocation from "./sidePanel/AddLocation";
import Abc from "./sidePanel/Abc";
import AssistWalker from "./sidePanel/AssistWalker";
import Comment from "./sidePanel/Comment";
import AttachFile from "./sidePanel/AttachFile";
import PrintOut from "./sidePanel/PrintOut";
import QrCodeScanner from "./sidePanel/QrCodeScanner";
import AppsStore from "./sidePanel/AppsStore";
import NearMe from "./sidePanel/NearMe";
import Form from "./Form.js";

const styles = {
  width: 500,
  height: 500,
  border: "1px solid black",
  borderRadius: "10px",
  position: "relative",
};

export default function DrugDrop() {
  const [board, setBoard] = useState({
    a: { top: 20, left: 20, el: <AddLocation /> },
    b: { top: 60, left: 20, el: <Comment /> },
    c: { top: 100, left: 20, el: <Abc /> },
    d: { top: 140, left: 20, el: <AssistWalker /> },
    e: { top: 180, left: 20, el: <AttachFile /> },
    f: { top: 220, left: 20, el: <PrintOut /> },
    g: { top: 260, left: 20, el: <QrCodeScanner /> },
    h: { top: 300, left: 20, el: <AppsStore /> },
    r: { top: 340, left: 20, el: <NearMe /> },
  });

  function UniKey() {
    const newId = new Date();
    return `copy_${newId}`;
  }

  const moveBox = useCallback(
    (id, left, top) => {
      if (left >= 20 && left <= 590 && top >= 20 && top <= 500) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [id]: {
            ...prevBoard[id],
            top,
            left,
          },
        }));
      }
      if (id.length === 1) {
        const newId = UniKey();
        const updatedBoard = (prevBoard) => ({
          ...board,
          [newId]: {
            top,
            left,
            el: prevBoard[id].el,
          },
        });
        setBoard(updatedBoard);
      }
    },
    [board]
  );
  console.log(board, "124124");
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
      <div className="head">
        <Form />
      </div>
      <div className="container">
        <div className="board" ref={drop} style={styles}></div>
        <div className="icons" style={{ opacity: isOver ? 0.5 : 3 }}>
          {Object.keys(board).map((key) => {
            const { left, top, el } = board[key];
            return (
              <Icon key={key} id={key} left={left} top={top} el={el}>
                {el}
              </Icon>
            );
          })}
        </div>
      </div>
    </>
  );
}
