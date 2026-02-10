import Student from "../Models/Student.js";
import bcrypt from "bcryptjs"

export async function signupRequest(req,res){
    const {name, reg_no, email, password} = req.body;

    const lowerEmail = email.toLowerCase();

    const exists = await Student.findOne({email: lowerEmail});

    if(exists){
        return res.status(409).json({message: "Student already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
        name,
        reg_no,
        email: lowerEmail,
        password: hashedPassword
    });

    res.status(201).json({message: "Student details added to database"});
}