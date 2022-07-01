import React, { useState } from "react";
import AddProjectForm from "../AddProjectForm";
import "./styles.css";
import {useEffect} from 'react';
import dummyData from './dummyData.json';
import ProjectCard from '../ProjectCard/'

const getProjects = () => {
     return dummyData;
}

const ProjectCardsContainer = () => {
     const [isFormOpen, setIsFormOpen] = useState(false);
     const [projects, setProjects] = useState([]);

     const toggleForm = () => {
          setIsFormOpen((prevState) => {
               return !prevState;
          });
     };

     useEffect(() => {
          setProjects( getProjects() );
     }, [projects]);


     return (
          <>
               <div className="projects-container-wrapper">
                    <div className="projects-container">
                         <button
                              type="button"
                              id="add-project-btn"
                              className="add-project-btn btn"
                              onClick={toggleForm}
                         >
                              + New Project
                         </button>
                         {isFormOpen && <AddProjectForm />}

                         <div id="projects">
                              {projects.map( (project) => {
                                   return <ProjectCard key={project.id} project={project} />
                              } )}
                         </div>
                    </div>
               </div>
          </>
     );
};

export default ProjectCardsContainer;
