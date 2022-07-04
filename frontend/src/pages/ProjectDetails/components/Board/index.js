import React from "react";
import "./styles.css";
import editIcon from '../../../../assets/edit-btn.svg'
import deleteIcon from "../../../../assets/delete-btn.svg"
import {Link} from 'react-router-dom'
import Cards from '../Cards/'

export const Board = ({
     id,
     title,
     project_id: projectId,
     date_created: dateCreated,
     cards,
}) => {
     // console.log("cards drom board : %o", cards)
     return (
          <div className="board" id={"b-"+id}>
               <div className="board-header">
                    <h3 className="board-title"> {title} </h3>
                    <div className="board-header-settings">
                         <Link className="edit-board-title btn" to="#">
                              <img
                                   src={editIcon}
                                   className="svg svg-icon-md p-top"
                              />
                         </Link>
                         <Link className="delete-board btn" to="#">
                              <img
                                   className="svg svg-icon-md p-top"
                                   src={deleteIcon}
                              />
                         </Link>
                    </div>
               </div>
               <div className="board-body">
               {/* {console.log(cards)} */}
                    <Cards {...cards}/>
               </div>
               <div className="board-footer">
                    <div className="add-card-form" action="#" method="POST">
                         <input
                              className="new-card-text"
                              type="text"
                              placeholder="New todo"
                         />
                         <button
                              className="add-card-btn btn"
                              type="submit"
                              value="submit-new-card"
                         >
                              +
                         </button>
                    </div>
               </div>
          </div>
     );
};
