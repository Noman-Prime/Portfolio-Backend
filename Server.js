import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DataBase_Conntection.js";
import routerProject from "./Projects/Routes.js";
import routerAdmin from "./Admin/Routes.js";
import routerLogin from "./Login/Routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/project", routerProject);
app.use("/api/v1/admin", routerAdmin);
app.use("/api/v1/login",routerLogin)

const PORT = process.env.PORT|| 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));