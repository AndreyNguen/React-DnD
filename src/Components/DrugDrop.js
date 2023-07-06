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
    a: { top: 0, left: 0, el: <AddLocation /> },
    b: { top: 0, left: 0, el: <Comment /> },
    c: { top: 0, left: 0, el: <Abc /> },
    d: { top: 0, left: 0, el: <AssistWalker /> },
    e: { top: 0, left: 0, el: <AttachFile /> },
    f: { top: 0, left: 0, el: <PrintOut /> },
    g: { top: 0, left: 0, el: <QrCodeScanner /> },
    h: { top: 0, left: 0, el: <AppsStore /> },
    r: { top: 0, left: 0, el: <NearMe /> },
  });

  function UniKey() {
    const uniKey = new Date();
    return `copy_${uniKey}`;
  }

  const moveBox = useCallback(
    (id, left, top) => {
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
