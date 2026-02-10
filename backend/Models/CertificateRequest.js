import mongoose from "mongoose";

//1.create a schema
//2. create a model based on that schema

//Schema
const certificateSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    certificateType: {
      type: String,
      enum: ["bonafide", "lor", "noc", "no-dues"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ["pending","approved","rejected"],
    },
    adminRemarks: String,
    pdfURL: String,
    approvedAt: Date,
  },
  { timestamps: true }
);

//Creating Model
const CertificateRequest = mongoose.model("CertificateRequest", certificateSchema);

export default CertificateRequest;
