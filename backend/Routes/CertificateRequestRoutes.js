import express from "express"

import {createCertificateRequest} from "../Controllers/CertificateRequestController.js"
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { studentOnly } from "../Middlewares/StudentOnly.js";
import { authRequest } from "../Controllers/AuthController.js";
import { signupRequest } from "../Controllers/SignupController.js";

const router = express.Router();

router.post("/certificates", verifyToken, studentOnly,createCertificateRequest);
router.post("/login", authRequest);
router.post("/signup", signupRequest);

export default router;