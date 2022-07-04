import React, { useState, useRef } from "react";
import "./styles.css";

const AddBoardForm = () => {
     const [isNameEmpty, setIsNameEmpty] = useState(false);
     const nameElRefContainer = useRef(null);

     const addBoard = () => {
          const text = nameElRefContainer.current.value;
          // check if text is falsible
          if (text === "") {
               setIsNameEmpty(true);
          } else {
               setIsNameEmpty(false);
          }
     };

     return (
          <>
               <div id="add-board-form-container">
                    <div id="add-board-form" action="#" method="POST">
                         <div className="text-input-wrapper">
                              <input
                                   id="new-board-text-input"
                                   type="text"
                                   name="nameEl"
                                   placeholder="Board title"
                                   ref={nameElRefContainer}
                              />
                              {isNameEmpty && (
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
                              className="btn"
                         >
                              Create Board
                         </button>
                    </div>
               </div>
          </>
     );
};

export default AddBoardForm;
