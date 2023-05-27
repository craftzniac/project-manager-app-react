import React, { useState, useRef } from "react";
import "./styles.css";
import baseUrl from '../../../baseUrl'

const AddProjectForm = ({ setProjects }) => {
     const [name, setName] = useState('')
     const [isNameEmpty, setIsNameEmpty] = useState(false);
 
     const addProject = async () => {
          // check if text is falsible
          if (name === "") {
               setIsNameEmpty(true);
          } else {
               setIsNameEmpty(false);
               const project = await (await fetch(baseUrl + '/projects', {
                    method: 'POST',
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify({projectName: name})

               })).json();

               //clear name to clear the input field since value of input is bound to it
               setName("")

               // add the new project to the list of projects to be displayed
               setProjects((prevValue) => {
                    return [...prevValue, project]
               })
          }
     };
     

     return (
          <>
               <div id="add-project-form-container">
                    <div id="create-new-project-form">
                         <div className="text-input-wrapper">
                              <input
                                   type="text"
                                   name="nameEl"
                                   placeholder="Enter Project name"
                                   id="new-project-name"
                                   onChange={(e) => setName(e.target.value)}
                                   value={name}
                              />
                              {isNameEmpty && (
                                   <p className="error-msg">
                                        You have not entered any project name
                                   </p>
                              )}
                         </div>
                         <button
                              type="button"
                              id="project-submit-btn"
                              className="btn"
                              onClick={addProject}
                         >
                              Add Project
                         </button>
                    </div>
               </div>
          </>
     );
};

export default AddProjectForm;
