import express from "express";
import { upload } from "../middlewear.js";
import { createProject, getProjects, getProject, updateProject, deleteProject } from "./Controller.js";

const routerProject = express.Router();

routerProject.post("/", upload.single("image"), createProject);
routerProject.get("/all-projects", getProjects);
routerProject.get("/get/:id", getProject);
routerProject.put("/update/:id", upload.single("image"), updateProject);
routerProject.delete("/delete/:id", deleteProject);

export default routerProject;


// http://localhost:3000/api/v1/project/
// http://localhost:3000/api/v1/project/all-projects
// http://localhost:3000/api/v1/project/get/:id
// http://localhost:3000/api/v1/project/update/:id
// http://localhost:3000/api/v1/project/delete/:id