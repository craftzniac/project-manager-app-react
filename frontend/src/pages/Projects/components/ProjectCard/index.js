import React from "react";
import "./styles.css";

const ProjectCard = ({ project }) => {
     return (
          <div className="project" id={project.id}>
               <h3 className="project-title">{project.name}</h3>
               <div className="project-extra">
                    <h5>Boards: {project.boardCount} </h5>
                    <h5>Date Created: {project.date_created.split("T")[0]}</h5>
               </div>
          </div>
     );
};

export default ProjectCard;
