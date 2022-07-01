import React, { useState, useRef } from "react";
import "./styles.css";

const AddProjectForm = () => {
     const [isNameEmpty, setIsNameEmpty] = useState(false);
     const nameElRefContainer = useRef(null);

     const addProject = () => {
          const text = nameElRefContainer.current.value;
          // check if text is falsible
          if (text === "") {
               setIsNameEmpty(true);
          } else {
               setIsNameEmpty(false);
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
                                   ref={nameElRefContainer}
                              />
                              {isNameEmpty && (
                                   <p className="error-msg">
                                        You have not entered any project name
                                   </p>
                              )}
                         </div>
                         <button
                              type="button"
                              value="Add project"
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
