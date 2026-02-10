import CertificateRequest from "../Models/CertificateRequest.js";

export async function createCertificateRequest(req, res) {
  try {
    const existing = await CertificateRequest.findOne({
      studentId: req.user.id,
      certificateType: req.body.certificateType,
      status: "pending",
    });

    if (existing)
      return res.status(409).json({ message: "Request already pending" });
    else {
      const request = await CertificateRequest.create({
        studentId: req.user.id,
        certificateType : req.body.certificateType,
        reason : req.body.reason
      });
      res.status(201).json(request)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
