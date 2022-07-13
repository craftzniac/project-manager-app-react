import React from "react";
import Header from "./components/Header/";
import Main from "./components/Main/";
import { useFetch } from "../../customHooks/useFetch";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const ProjectDetails = () => {
     const { id } = useParams();

     const baseUrl = "http://localhost:4000/api/v1";
     const [project, setProject] = useState({
          id: id,
          name: "",
          dateCreated: "",
          boardCount: 0,
          boards: []
     });

     const [response, error, loading] = useFetch(baseUrl + "/projects/" + id);

     useEffect(() => {
          if (response) {
               setProject(response);
          }
     }, [response]);

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
