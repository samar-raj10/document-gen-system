import express from "express"
import { adminAuthRequest, approveCertificatebyId, getCertificatebyId, getCertificateRequest, rejectCertificatebyId } from "../Controllers/adminController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { adminOnly } from "../Middlewares/AdminOnly.js";

const router = express.Router();

router.post("/login",adminAuthRequest)
router.get("/certificates", verifyToken, adminOnly, getCertificateRequest)
router.get("/certificates/:id",verifyToken, adminOnly, getCertificatebyId)
router.patch("/certificates/:id/approve", verifyToken, adminOnly, approveCertificatebyId)
router.patch("/certificates/:id/reject", verifyToken, adminOnly, rejectCertificatebyId)


export default router;