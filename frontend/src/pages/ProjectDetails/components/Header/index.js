import React, { useState } from "react";
import "./styles.css";
import { Link , Navigate} from "react-router-dom";
import Dialog, { DialogType } from '../Dialog/'
import baseUrl from '../../../baseUrl'

import deleteIcon from "../../../../assets/delete-btn.svg";

const Header = ({ id, name, dateCreated }) => {

     const [isDialogOpen, setIsDialogOpen] = useState(false)
     const [isProjectDeleted, setIsProjectDeleted] = useState(false)

     const showDeleteDialog = () => {
          setIsDialogOpen(true)
     }

     const deleteProject = async () => {
               const response = await (
                    await fetch(baseUrl + "/projects/", {
                         method: "DELETE",
                         headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ projectId : id }),
                    })
               ).json();

               setIsProjectDeleted(true)
     }


     return (
          <>
          {isProjectDeleted && <Navigate replace to="/"/>}
          { isDialogOpen && <Dialog  type={DialogType.PROJECT} setIsDialogOpen={setIsDialogOpen} performDelete={deleteProject} />  }
          <header className="primary-header">
               <nav>
                    <div id="project-title-container">
                         <h1 className={"id" + id} id="project-title">
                              {name}
                         </h1>
                         <p>
                              created on:
                              <span id="project-creation-date">
                                   {" " + dateCreated.split("T")[0]}
                              </span>
                         </p>
                    </div>

                    <div>
                         <Link to="/" id="all-projects-btn" className="btn">
                              My Projects
                         </Link>
                         <button
                              type="button"
                              id="delete-project-btn"
                              className="btn"
                              onClick={showDeleteDialog}
                         >
                              <img
                                   className="svg svg-icon-lg p-top"
                                   alt=""
                                   src={deleteIcon}
                              />
                         </button>
                    </div>
               </nav>
          </header>
          </>
          
     );
};

export default Header;
