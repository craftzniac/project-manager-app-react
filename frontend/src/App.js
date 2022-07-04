import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import "./App.css";

// pages
import Projects from "./pages/Projects/";
import PageNotFound from "./pages/PageNotFound/";
import ProjectDetails from "./pages/ProjectDetails/";

const App = () => {
     return (
          <Router>
               <Routes>
                    <Route path="/" element={<Projects />}></Route>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="*" element={<PageNotFound />} />
               </Routes>
          </Router>
     );
};

export default App;
