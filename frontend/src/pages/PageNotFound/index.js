import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const index = () => {
     return (
          <div className="error-container">
               <h1 className="error-msg">
                    Sorry, the Page you are looking for does not exist
               </h1>

               <Link to={"/projects"} className="go-back-btn btn">
                    Back To Projects
               </Link>
          </div>
     );
};

export default index;
