import { Contact, Experience, Project } from "../models/portfolioModel.js";
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

        const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: '7h'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV ==='production'?'none':'strict',
            maxAge: 7*60*60*1000,
            path: '/'
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
            path: '/'
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


export const putProjects = async (req, res) =>{
    const {id} = req.params;
    const data = req.body;
    try {
        const updateData = await Project.findByIdAndUpdate(id, data );
        if(updateData){
            return res.json({success:true, message:"Updated successfully."});
        }
        else{
            return res.json({success:false, message:updateData.messsage})
        }
       
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}



export const putExperience = async (req, res) =>{
    const {id} = req.params;
    const data = req.body;
    try {
        const updateData = await Experience.findByIdAndUpdate(id, data );
        if(updateData){
            return res.json({success:true, message:"Updated successfully."});
        }
        else{
            return res.json({success:false, message:updateData.messsage})
        }
       
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}


export const deleteProject = async (req, res) =>{
    const {id} = req.params;
    try{
        const deleteData = await Project.findByIdAndDelete(id);
        if(deleteData){
        return res.json({success: true, message: "Deleted successfully."});
        }
        else{
            return res.json({success: false, message: deleteData.message})
        }
    } catch(error){
        return res.json({success: false, message: error.message})
    }
    
}

export const deleteExperience = async (req, res) =>{
    const {id} = req.params;
    try{
        const deleteData = await Experience.findByIdAndDelete(id);
        if(deleteData){
        return res.json({success: true, message: "Deleted successfully."});
        }
        else{
            return res.json({success:false, message: deleteData.message})
        }
    } catch(error){
        return res.json({success: false, message: error.message})
    }
    
}

export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find().skip(skip).limit(limit);
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



