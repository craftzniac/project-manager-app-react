import React, { useState } from "react";
import "./styles.css";

import {Board} from "../Board/";

const Boards = ({boards}) => {
     return (
          <div className="boards">
               {boards.map((board) => {
                    console.log(board.id)
                    return <Board key={board.id} {...board} />
               })}
          </div>
     );
};

export default Boards;
