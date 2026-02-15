import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    
    if(!user){
        return res.status(404).json({message : "User not found"});
    }

    const isMatch = bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message: "Invalid Credentials"});
    }

    const token = jwt.sign(
        {id:user._id, role:user.role}, process.env.JWT_SECRET ,
        {expiresIn: "1d"}
    )
    
    res.status(200).json({token});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
