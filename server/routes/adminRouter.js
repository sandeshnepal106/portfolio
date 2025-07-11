import express from "express";
import { authCheck, login, logout, postExperience, postProjects } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import { getExperience, getProjects } from "../controllers/visitorController.js";
const adminRouter = express.Router();

adminRouter.post('/login', login);
adminRouter.post('/logout', logout);
adminRouter.post('/auth-check', adminAuth, authCheck);
adminRouter.post('/experience', adminAuth, postExperience);
adminRouter.post('/projects', adminAuth, postProjects);
adminRouter.get('/experience',  getExperience);
adminRouter.get('/projects', getProjects);

export default adminRouter;
