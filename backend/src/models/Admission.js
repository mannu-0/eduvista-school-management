const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    // =========================
    // Student Information
    // =========================

    studentName: {
      type: String,
      required: true,
      trim: true
    },

    dateOfBirth: {
      type: Date,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },

    className: {
      type: String,
      required: true,
      trim: true
    },

    previousSchool: {
      type: String,
      trim: true
    },


    // =========================
    // Parent / Guardian
    // =========================

    fatherName: {
      type: String,
      required: true,
      trim: true
    },

    motherName: {
      type: String,
      trim: true
    },

    guardianPhone: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    occupation: {
      type: String,
      trim: true
    },


    // =========================
    // Address
    // =========================

    address: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    state: {
      type: String,
      required: true,
      trim: true
    },

    pincode: {
      type: String,
      required: true,
      trim: true
    },


    // =========================
    // Additional Information
    // =========================

    message: {
      type: String,
      trim: true
    },


    // =========================
    // Application Status
    // =========================

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Approved", "Rejected"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Admission", admissionSchema);
