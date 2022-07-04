import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import AddBoardForm from "../AddBoardForm/";
import Boards from "../Boards/";

const Main = ({ id , boardCount, boards}) => {

     const [isFormOpen, setIsFormOpen] = useState(false);

     const toggleForm = () => {
          setIsFormOpen((prevState) => {
               return !prevState;
          });
     };

     return (
          <main>
               <section className="boards-list-container">
                    <header className="section-header">
                         <div className="board-count-container">
                              <h2>Boards</h2>
                              <span id="board-count">
                                   {" "}
                                   {boardCount}{" "}
                              </span>
                         </div>
                         <Link
                              to="#"
                              id="add-board-btn"
                              className="btn add-board-btn"
                              onClick={toggleForm}
                         >
                              + Add Board
                         </Link>
                    </header>

                    {isFormOpen && <AddBoardForm />}

                    {<Boards boards={boards}/>}
               </section>
          </main>
     );
};

export default Main;
