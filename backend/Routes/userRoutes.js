import express from "express";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { authRole } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

//admin routes 
router.get("/admin", verifyToken, authRole("admin"), (req,res) => {
    res.json({message: "Welcome Admin"});
});

//admin and hod routes 
router.get("/hod",verifyToken, authRole("admin", "hod"), (req,res) => {
    res.json({message: "Welcome HOD"});
});
//admin, hod, coordinator
router.get("/coordinator", verifyToken, authRole("admin", "hod", "coordinator"), (req,res) => {
    res.json({message: "Welcome Coordinator"});
});
//admin, hod, coordinator, faculty
router.get("/faculty",verifyToken, authRole("admin", "hod", "coordinator", "faculty"), (req,res) => {
    res.json({message: "Welcome Faculty"});
});
//all users
router.get("/student",verifyToken, authRole("student"), (req,res) => {
    res.json({message: "Welcome Student"});
});


export default router;