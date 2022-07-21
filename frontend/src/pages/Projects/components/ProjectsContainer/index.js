import React, { useState } from "react";
import AddProjectForm from "../AddProjectForm";
import "./styles.css";
import { useEffect } from "react";
import upArrow from '../../../../assets/up_arrow.svg'

import Project from "../Project/";
import baseUrl from '../../../baseUrl'

const ProjectsContainer = () => {
     const [isFormOpen, setIsFormOpen] = useState(false);
     const [projects, setProjects] = useState([]);
     const [isLoading, setIsLoading] = useState(true)

     const toggleForm = () => {
          setIsFormOpen((prevState) => {
               return !prevState;
          });
     };

     useEffect(() => {
          async function fetchData() {
               const response = await (await fetch(baseUrl + "/projects/")).json();
               if (response) {
                    setProjects(response);
               }
               setIsLoading(false)
          }
          fetchData();

     }, []);
 
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

                         {isFormOpen && <AddProjectForm setProjects={setProjects} />}
                         {projects.length === 0 && <NoProject />}
                         {isLoading && <h1>Loading ...</h1>}
                         {projects && (
                              <div id="projects">
                                   {projects.map((project) => {
                                        return (
                                             <Project
                                                  key={project.id}
                                                  {...project}
                                             />
                                        );
                                   })}
                              </div>
                         )}
                    </div>
               </div>
          </>
     );
};


const NoProject = () => {
     return (
          <div className="no-project">

               <img src={upArrow} className="up-arrow"/>
               <p className="empty-project-text">
                    You don't have any project(s) yet! Click the
                    'New Project' button to add a Project
               </p>
          </div>
     );
}

export default ProjectsContainer;
