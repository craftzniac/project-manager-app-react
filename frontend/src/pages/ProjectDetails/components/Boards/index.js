import React, { useState } from "react";
import "./styles.css";

import {Board} from "../Board/";

const Boards = ({boards, setBoards, setProjBoardCount}) => {
     return (
          <div className="boards">
               {boards.map((board) => {
                    console.log(board.id)
                    return <Board key={board.id} {...board} setBoards={setBoards} setProjBoardCount = {setProjBoardCount}/>
               })}
          </div>
     );
};

export default Boards;
