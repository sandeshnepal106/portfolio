import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: {
        type: [String],
       
    },
    githubUrl: {
        type: String,
        
    },
    imageUrl: {
        type: String,
    },
})

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date
    },
    location: { 
        type: String 
    },
    techStack: {
        type: [String],
       
    },
    githubUrl: {
        type: String,
        
    },
    logoUrl: {
        type: String,
    },
});

const contactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 

    },
    email: { 
        type: String, 
        required: true 

    },
    message: { 
        type: String, 
        required: true 

    },
    sentAt: { 
        type: Date, 
        default: Date.now 

    }
})

export const Project = mongoose.model('Project', projectSchema);
export const Experience = mongoose.model('Experience', experienceSchema);
export const Contact = mongoose.model('Contact', contactSchema);