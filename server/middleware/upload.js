// src/middleware/upload.js

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// --- 1. Cloudinary Configuration ---
// Ensure you have these environment variables set up in your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- 2. Cloudinary Storage Engine Setup ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // You can set dynamic parameters based on the request or file
    return {
      // 💡 Uploads will be stored in a folder named 'portfolio_gallery'
      folder: 'portfolio_gallery', 
      // 💡 Generate a unique public ID (based on the filename)
      public_id: `${file.fieldname}-${Date.now()}`, 
      // 💡 Set the resource type to 'auto' to handle different media types
      resource_type: 'auto', 
      // Optional: Apply transformations
      // transformation: [{ width: 1000, crop: "limit" }]
    };
  },
});

// --- 3. Multer Instance ---
// This instance uses the Cloudinary storage engine
const upload = multer({ 
    storage: storage,
    // Set a file size limit (e.g., 10MB)
    limits: { 
        fileSize: 10 * 1024 * 1024 // 10 megabytes 
    },
    fileFilter: (req, file, cb) => {
        // Optional: Implement file type validation
        if (!file.mimetype.startsWith('image')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

export default upload;