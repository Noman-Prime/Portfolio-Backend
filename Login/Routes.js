import express from "express";
import { getMe, login} from "./Controller.js";
import authMiddleware from "../middlewear.js";

const routerLogin = express.Router();
routerLogin.post("/", login);
routerLogin.get("/me",authMiddleware, getMe);

export default routerLogin;

// http://localhost:3000/api/v1/login/
// http://localhost:3000/api/v1/login/me