import React, { useState } from "react";
import AddProjectForm from "../AddProjectForm";
import "./styles.css";
import { useEffect } from "react";

import Project from "../Project/";

import { useFetch } from "../../../../customHooks/useFetch";

import baseUrl from '../../../baseUrl' 

const ProjectsContainer = () => {
     const [isFormOpen, setIsFormOpen] = useState(false);
     const [projects, setProjects] = useState([]);

     const [response, error, loading] = useFetch(baseUrl + "/projects");

     const toggleForm = () => {
          setIsFormOpen((prevState) => {
               return !prevState;
          });
     };

     useEffect(() => {
          if (response) {
               setProjects(response);
          }
     }, [response]);

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

                         {isFormOpen && <AddProjectForm setProjects={setP/api/v1/projectrojects}/>}
                         {loading && <h1>Loading ...</h1> }
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

export default ProjectsContainer;
