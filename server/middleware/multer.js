// Example: src/middleware/upload.js 

// Note: You might need to change the import structure based on your project setup
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary instance

// Assuming you've configured cloudinary.config() here or in an imported file
// If not configured, ensure the configuration block from Step 1 is executed here.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 💡 Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'portfolio_gallery', 
      // 💡 Ensure public_id is defined here to be available as req.file.filename
      public_id: `${file.fieldname}-${Date.now()}`, 
      resource_type: 'auto', 
    };
  },
});

// Multer instance using Cloudinary Storage
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Optional: limit file size to 10MB
});

export default upload; // Export the configured middleware