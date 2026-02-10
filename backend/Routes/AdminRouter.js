import express from "express"
import { adminAuthRequest, approveCertificatebyId, getCertificatebyId, getCertificateRequest, rejectCertificatebyId } from "../Controllers/adminController.js";
import { authMiddleware } from "../Middlewares/AuthMiddleware.js";
import { adminOnly } from "../Middlewares/AdminOnly.js";

const router = express.Router();

router.post("/login",adminAuthRequest)
router.get("/certificates", authMiddleware, adminOnly, getCertificateRequest)
router.get("/certificates/:id",authMiddleware, adminOnly, getCertificatebyId)
router.patch("/certificates/:id/approve", authMiddleware, adminOnly, approveCertificatebyId)
router.patch("/certificates/:id/reject", authMiddleware, adminOnly, rejectCertificatebyId)


export default router;