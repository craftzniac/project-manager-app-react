import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Project = ({ id, name, boardCount, dateCreated }) => {
     return (
          <Link to={`/projects/${id}`}>
               <div className="project" id={id}>
                    <h3 className="project-title">{name}</h3>
                    <div className="project-extra">
                         <h5>Boards: {boardCount} </h5>
                         <h5>Date Created: {dateCreated.split("T")[0]}</h5>
                    </div>
               </div>
          </Link>
     );
};

export default Project;
