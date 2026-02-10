import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../Models/Admin.js";
import CertificateRequest from "../Models/CertificateRequest.js";

export async function adminAuthRequest(req, res) {
  try {
    const { email, password} = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token , role: admin.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCertificateRequest(req, res) {
  try {
    const requests = await CertificateRequest.find()
      .populate("studentId", "name reg_no")
      .sort({ createdAt: -1 });
    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCertificatebyId(req, res) {
  try {
    const request = await CertificateRequest.findById(req.params.id).populate(
      "studentId", "name reg_no"
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function approveCertificatebyId(req,res){
    try {
        const request = await CertificateRequest.findById(req.params.id).populate("studentId", "name reg_no");
        if(!request){
            return res.status(404).json({message: "Request not found"});
        }
        if(request.status !== "pending"){
            return res.status(400).json({message: "Already processed"});
        }

        //placeholder
        const pdfUrl =  `/uploads/${request._id}.pdf`;

        request.status = "approved";
        request.approvedAt = new Date();
        request.pdfURL = pdfUrl;
        request.adminRemarks = req.body.remarks;

        await request.save();

        res.json({message: "Certificate approved"});
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Internal Server Error" }); 
    }
}

export async function rejectCertificatebyId(req,res){
    try {
        const request = await CertificateRequest.findById(req.params.id).populate("studentId", "name reg_no");
        if(!request){
            return res.status(404).json({message: "Request not found"});
        }
        if(request.status !== "pending"){
            return res.status(400).json({message: "Already processed"});
        }

        request.status = "rejected";
        request.adminRemarks = req.body.remarks;

        await request.save();

        res.json({message: "Certificate rejected"});
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Internal Server Error" }); 
    }
}

