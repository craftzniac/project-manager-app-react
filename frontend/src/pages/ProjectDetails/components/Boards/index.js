import React, { useState } from "react";
import "./styles.css";

import {Board} from "../Board/";

const Boards = ({ boards }) => {
     //  const [boards, setBoards] = useState([]);
     return (
          <div className="boards">
               {boards.map((board) => {
                    {/* console.log(board) */}
                    return <Board key={board.id} {...board} />
               })}
          </div>
     );
};

export default Boards;
