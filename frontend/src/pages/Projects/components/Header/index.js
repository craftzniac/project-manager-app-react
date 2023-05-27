import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
     return (
          <header>
               <h1>
                    <Link to="#" className="my-projects-link">My Projects</Link>
               </h1>
               <p>
                    Welcome! <Link to="#" className="profile-link"></Link>
               </p>
          </header>
     );
};
 
export default Header;
