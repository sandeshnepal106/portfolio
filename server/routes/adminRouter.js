import express from "express";
import {
    authCheck,
    getContacts,
    login,
    logout
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

// --- Auth Routes ---
adminRouter.post('/login', login);
adminRouter.post('/logout', logout);
adminRouter.post('/auth-check', adminAuth, authCheck);

// --- GET Routes (Admin View/Contacts) ---
adminRouter.get('/contacts', adminAuth, getContacts);

export default adminRouter;