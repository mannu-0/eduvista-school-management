const express = require("express");
const Admission = require("../models/Admission");
const Student = require("../models/Student");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", async (req, res) => {
  try {
    const admission = await Admission.create(req.body);

    res.status(201).json({
      message: "Admission application submitted successfully",
      admission
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to submit admission application",
      error: error.message
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });

    res.json(admissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admissions",
      error: error.message
    });
  }
});

// Update admission status
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Reviewed",
      "Approved",
      "Rejected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        message: "Admission application not found"
      });
    }

    // If already approved, don't create another student
    if (
      status === "Approved" &&
      admission.status !== "Approved"
    ) {
      const existingStudent = await Student.findOne({
        admissionId: admission._id
      });

      if (!existingStudent) {
        const student = await Student.create({
          admissionId: admission._id,

          studentName: admission.studentName,
          dateOfBirth: admission.dateOfBirth,
          gender: admission.gender,
          className: admission.className,
          previousSchool: admission.previousSchool,

          fatherName: admission.fatherName,
          motherName: admission.motherName,
          guardianPhone: admission.guardianPhone,
          email: admission.email,
          occupation: admission.occupation,

          address: admission.address,
          city: admission.city,
          state: admission.state,
          pincode: admission.pincode
        });

        admission.status = status;
        await admission.save();

        return res.json({
          message: "Admission approved and student created successfully",
          admission,
          student
        });
      }
    }

    admission.status = status;
    await admission.save();

    res.json({
      message: "Admission status updated successfully",
      admission
    });

  } catch (error) {
    console.error("Admission status update error:", error);

    res.status(500).json({
      message: "Failed to update admission status",
      error: error.message
    });
  }
});

module.exports = router;
