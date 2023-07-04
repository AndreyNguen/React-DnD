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

function DrugDrop() {
  const [board, setBoard] = useState({
    a: { id: 1, top: 20, left: 20, el: <AddLocation /> },
    b: { id: 2, top: 60, left: 20, el: <Comment /> },
    c: { id: 3, top: 100, left: 20, el: <Abc /> },
    d: { id: 4, top: 140, left: 20, el: <AssistWalker /> },
    e: { id: 5, top: 180, left: 20, el: <AttachFile /> },
    f: { id: 6, top: 220, left: 20, el: <PrintOut /> },
    g: { id: 7, top: 260, left: 20, el: <QrCodeScanner /> },
    h: { id: 8, top: 300, left: 20, el: <AppsStore /> },
    r: { id: 9, top: 340, left: 20, el: <NearMe /> },
  });

  console.log(board, "77-2465-2356-535-12");

  function generateUniqueKey() {
    const uniKey = new Date();
    return uniKey;
  }

  const moveBox = useCallback(
    (id, left, top, isCopy) => {
      if (left >= 20 && left <= 590 && top >= 20 && top <= 500) {
        setBoard((prevBoard) => ({
          ...prevBoard,
          [id]: {
            ...prevBoard[id],
            top,
            left,
            id,
          },
        }));
      }
      if (!isCopy) {
        const newId = generateUniqueKey();
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

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.ICON,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top, false);
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

export default DrugDrop;
