const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    admissionFee: {
      type: Number,
      default: 0,
    },

    registrationFee: {
      type: Number,
      default: 0,
    },

    tuitionFee: {
      type: Number,
      default: 0,
    },

    annualCharges: {
      type: Number,
      default: 0,
    },

    activityFee: {
      type: Number,
      default: 0,
    },

    transportFee: {
      type: Number,
      default: 0,
    },

    otherCharges: {
      type: Number,
      default: 0,
    },

    academicSession: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fee", feeSchema);
