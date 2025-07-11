import { Experience, Project } from "../models/portfolioModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel.js";

export const login = async (req, res) =>{
    const {adminName, password} = req.body;
    if(!adminName || !password){
        return res.json({success: false, message: 'Email and password are required'})
    }
    
    try{
        const admin = await adminModel.findOne({adminName});
        if(!admin){
            return res.json({success: false, messsage:"Invalid email"})
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if(!isMatch){
            return res.json({success: false, message: "Invalid password"})
        }

        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV ==='production'?'none':'strict',
            maxAge: 7*60*60*1000
        })

        return res.json({success: true, message: "Logged In successfully."});


    } catch(error){
        return res.json({success: false, messsage: error.message});
    }
}

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV ==='production'?'none':'strict',
        })

        return res.json({success: true, message: "Logged Out"})
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}

export const authCheck = async (req, res)=>{
    try {
        return res.json({success: true, message: "Authorized"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postProjects = async (req, res)=>{
    
    try {
        const {title, description, techStack, githubUrl, imageUrl} = req.body;
        const newProject = new Project({
            title,
            description,
            techStack,
            githubUrl,
            imageUrl
        });

        await newProject.save();
        return res.json({success: true, message:"Project saved successfully."})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postExperience = async (req, res)=>{
    try {
        const {company, role, description, startDate, endDate, location, techStack, githubUrl, logoUrl} = req.body;
        const newExperience = new Experience({
            company, 
            role, 
            description,  
            startDate, 
            endDate, 
            location, 
            techStack, 
            githubUrl, 
            logoUrl
        });

        await newExperience.save();
        return res.json({success: true, message:"Experience saved successfully."})

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}