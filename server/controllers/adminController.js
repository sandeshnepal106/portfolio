import { Contact } from "../models/portfolioModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel.js";

export const login = async (req, res) => {
    const { adminName, password } = req.body;
    if (!adminName || !password) {
        return res.json({ success: false, message: 'Email and password are required' })
    }

    try {
        const admin = await adminModel.findOne({ adminName });
        if (!admin) {
            return res.json({ success: false, messsage: "Invalid email" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" })
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 60 * 60 * 1000,
            path: '/',
        });

        return res.json({ success: true, message: "Logged In successfully." });

    } catch (error) {
        return res.json({ success: false, messsage: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        return res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

}

export const authCheck = async (req, res) => {
    try {
        return res.json({ success: true, message: "Authorized" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getContacts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50; // Increased limit so admin can see more at once
        const skip = (page - 1) * limit;

        const contacts = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Contact.countDocuments();

        return res.json({
            success: true,
            contacts,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

