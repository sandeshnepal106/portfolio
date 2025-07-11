import mongoose from "mongoose";
import dotenv from "dotenv";
import adminModel from "../models/adminModel.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const existingAdmin = await adminModel.findOne({ adminName: "admin" });

  if (existingAdmin) {
    console.log("Admin already exists");
  } else {
    const admin = new adminModel({
      adminName: "admin",
      password: "admin"
    });
    await admin.save();
    console.log("✅ Admin user created.");
  }

  process.exit();
} catch (error) {
  console.error("❌ Error creating admin:", error);
  process.exit(1);
}
