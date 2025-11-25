import express from "express";
import { upload } from "../middlewear.js";
import authMiddleware from "../middlewear.js";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from "./Controller.js";

const routerProject = express.Router();

// PUBLIC ROUTES
routerProject.get("/all-projects", getProjects); // no authMiddleware
routerProject.get("/get/:id", getProject);       // no authMiddleware

// PROTECTED ROUTES
routerProject.post("/", authMiddleware, upload.single("image"), createProject);
routerProject.put("/update/:id", authMiddleware, upload.single("image"), updateProject);
routerProject.delete("/delete/:id", authMiddleware, deleteProject);

export default routerProject;


/*
API Endpoints:
Public:
GET    /api/v1/project/all-projects
GET    /api/v1/project/get/:id

Protected (Bearer Token required):
POST   /api/v1/project/
PUT    /api/v1/project/update/:id
DELETE /api/v1/project/delete/:id
*/