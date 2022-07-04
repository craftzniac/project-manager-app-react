import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

import deleteIcon from "../../../../assets/delete-btn.svg";

const Header = ({ id, name, dateCreated }) => {
     return (
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
     );
};

export default Header;
