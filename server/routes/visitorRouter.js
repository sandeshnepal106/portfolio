import express from "express"
import { postContact } from "../controllers/visitorController.js";
const visitorRouter = express.Router();

visitorRouter.post('/contact', postContact);
export default visitorRouter;