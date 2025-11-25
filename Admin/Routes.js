import express from 'express'
import {  createAdmin, deleteAdmin, updateAdmin } from './Controller.js';

 const routerAdmin = express.Router();

 routerAdmin.post("/register", createAdmin);
 routerAdmin.put("/update/:id", updateAdmin);
 routerAdmin.delete("/delete/:id", deleteAdmin);

 export default routerAdmin;

//  http://localhost:3000/api/v1/admin/register
//  http://localhost:3000/api/v1/admin/update/:id
//  http://localhost:3000/api/v1/admin/delete/:id