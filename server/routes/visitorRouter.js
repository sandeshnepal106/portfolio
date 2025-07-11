import express from "express"
import { postContact, getExperience, getProjects } from "../controllers/visitorController.js";
const visitorRouter = express.Router();

visitorRouter.get('/project', getProjects);
visitorRouter.get('/experience', getExperience);
visitorRouter.post('/contact', postContact);
export default visitorRouter;