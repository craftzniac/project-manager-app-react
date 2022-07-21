import React from "react";
import Header from "./components/Header/";
import Main from "./components/Main/";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import baseUrl from "../baseUrl";

const ProjectDetails = () => {
     const { id } = useParams();

     const [project, setProject] = useState({
          id: id,
          name: "",
          dateCreated: "",
          boardCount: 0,
          boards: []
     });

     useEffect(() => {
          async function fetchData() {
               const response = await (await fetch(baseUrl + "/projects/" + id)).json()
               if (response) {
                    setProject(response);
               }
          }
          fetchData();
     }, []);

     return (
          <>
               <Header
                    id={project.id}
                    name={project.name}
                    dateCreated={project.dateCreated}
               />
               <Main
                    id={project.id}
                    boardCount={project.boardCount}
                    boards={project.boards}
               />
          </>
     );
};

export default ProjectDetails;
