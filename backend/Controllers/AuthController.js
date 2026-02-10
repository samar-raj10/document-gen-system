import Student from "../Models/Student.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function authRequest(req,res){
  const {email,password} = req.body;

  const lowerEmail = email.toLowerCase();

  console.log("Login attempt for email:", lowerEmail);

  const student = await Student.findOne({email: lowerEmail});

  console.log("Student found:", !!student);

  if(!student){
    return res.status(404).json({message: "Student not Found"});
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if(!isMatch){
    return res.status(401).json("Invalid Credentials");
  }

  const token = jwt.sign({
    id: student._id, 
    role: "student"
  },
  process.env.JWT_SECRET, {expiresIn: "1d"}
);

res.json({token});
};