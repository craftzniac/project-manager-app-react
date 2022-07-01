import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// pages
import Projects from "./pages/Projects/";
import PageNotFound from "./pages/PageNotFound/";

const App = () => {
     return (
          <Router>
               <Routes>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/" element={<Projects />} />
                    <Route path="*" element={<PageNotFound />} />
               </Routes>
          </Router>
     );
};

export default App;
