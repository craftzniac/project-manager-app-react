import React, { useState, useRef } from "react";
import "./styles.css";
import baseUrl from '../../../baseUrl'

const AddBoardForm = ({ projectId, setBoards, setProjBoardCount }) => {
     const [isTitleEmpty, setIsTitleEmpty] = useState(false);
     const [title, setTitle] = useState("")

     const addBoard = async () => {
          // check if text is falsible
          if (title === "") {
               setIsTitleEmpty(true);
          } else {
               setIsTitleEmpty(false);

               const response = await (await fetch(baseUrl + "/projects/boards/", {
                    method: 'POST',
                    headers: {
                         "Content-Type": "application/json",

                    },
                    body: JSON.stringify({ boardName: title, projectId: projectId })
               })).json()

               setBoards((prevValue) => {
                    return [...prevValue, response.board]
               })
               setProjBoardCount(response.projectBoardCount)
               setTitle("")
          }
     };

     return (
          <>
               <div id="add-board-form-container">
                    <div id="add-board-form">
                         <div className="text-input-wrapper">
                              <input
                                   id="new-board-text-input"
                                   type="text"
                                   name="nameEl"
                                   placeholder="Board title"
                                   onChange={(e) => setTitle(e.target.value)}
                                   value={title}
                              />
                              {isTitleEmpty && (
                                   <p className="error-msg">
                                        You have not entered any board name
                                    </p>
                              )}
                         </div>
                         <button
                              // id="create-board-btn"
                              type="submit"
                              id="add-board-btn"
                              onClick={addBoard}
                              className="btn">
                              Create Board
                         </button>
                    </div>
               </div>
          </>
     );
};

export default AddBoardForm;
