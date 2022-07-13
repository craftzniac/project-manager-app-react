import { Router, urlencoded, json } from "express";
import Project from "../model/project.js";
import generateId from "../utils/general.js";

const projectRouter = Router();

projectRouter.use(urlencoded({ extended: true }));
projectRouter.use(json());

const db = new Project();

// get all the projects or add a new project
projectRouter
     .route("/")
     .get((req, res) => {
          db.getAllProjects()
               .then((projects) => {
                    res.json(projects);
               })
               .catch((error) => {
                    res.status(500).json({ status: "something went wrong " });
               });
     })
     .post((req, res) => {
          const projectName = req.body.projectName;

          //write into database
          db.addProject(generateId(), projectName)
               .then((newProject) => {
                    res.json(newProject);
               })
               .catch((error) => {
                    res.status(500).json(error);
               });
     })
     .delete((req, res) => {
          db.deleteProject(req.body.projectId)
               .then((msg) => {
                    res.json(msg);
               })
               .catch((error) => {
                    res.status(500).json(error);
               });
     });

// gets a project in detail. Using POST inst4ad of GET just for convinence
projectRouter.get("/:id", async (req, res) => {
     try {
          const project = await db.getProject(req.params.id);
          res.json(project);
     } catch (error) {
          res.status(500).json(error);
     }
});

export default projectRouter;
