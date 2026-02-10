import bcrypt from "bcryptjs";
import Admin from "./Models/Admin.js";
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_CONN)
    const hashedPassword = await bcrypt.hash("admin@123",10);

    await Admin.create({
        name: "MUJ Admin",
        email: "admin.123@muj.manipal.edu",
        password : hashedPassword,
        designation: "Administrative Office"
    });

    console.log("Admin Created");
};

createAdmin();