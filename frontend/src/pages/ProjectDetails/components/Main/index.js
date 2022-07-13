import React, { useState , useEffect} from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import AddBoardForm from "../AddBoardForm/";
import Boards from "../Boards/";

const Main = (props) => {
     const [isFormOpen, setIsFormOpen] = useState(false);
     const [boards, setBoards] = useState([])
     const [projBoardCount, setProjBoardCount] = useState(0)
     
     useEffect(() => {
          setBoards(props.boards)
          setProjBoardCount(props.boardCount)
     }, [props.boards, props.boardCount])

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
                                   {projBoardCount}
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

                    {isFormOpen && <AddBoardForm projectId = { props.id } setBoards = {setBoards} setProjBoardCount = { setProjBoardCount }  />}

                    {<Boards boards={boards}/>}
               </section>
          </main>
     );
};

export default Main;
