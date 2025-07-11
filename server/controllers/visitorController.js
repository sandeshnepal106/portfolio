import { Contact, Experience, Project } from "../models/portfolioModel.js";

export const getProjects = async (req, res) =>{
    try {
        const projects = await Project.find();
        res.json(projects);
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getExperience = async (req, res) =>{
    try {
        const experience = await Experience.find();
        res.json(experience);
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postContact = async (req, res) =>{
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();
        return res.json({success: true, message: "Contact details save successfully."})
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}