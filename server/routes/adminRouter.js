import express from "express";
import { authCheck, deleteExperience, deleteProject, getContacts, login, logout, postExperience, postProjects, putExperience, putProjects } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import { getExperience, getProjects } from "../controllers/visitorController.js";
const adminRouter = express.Router();

adminRouter.post('/login', login);
adminRouter.post('/logout', logout);
adminRouter.post('/auth-check', adminAuth, authCheck);
adminRouter.post('/experience', adminAuth, postExperience);
adminRouter.post('/projects', adminAuth, postProjects);
adminRouter.put('/experience/:id', adminAuth, putExperience);
adminRouter.put('/projects/:id', adminAuth, putProjects);
adminRouter.delete('/experience/:id', adminAuth, deleteExperience);
adminRouter.delete('/projects/:id', adminAuth, deleteProject);

adminRouter.get('/contacts', adminAuth, getContacts);

adminRouter.get('/experience/:id',  getExperience);
adminRouter.get('/projects/:id', getProjects);

export default adminRouter;
